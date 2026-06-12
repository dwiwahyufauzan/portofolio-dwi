<script lang="ts">
    import { onMount } from "svelte";
    import {
        Gamepad2,
        Trophy,
        RotateCcw,
        Play,
        ChevronUp,
        ChevronDown,
        ChevronLeft,
        ChevronRight,
    } from "@lucide/svelte";

    // ─── GAME SNAKE LOGIC & STATE ───
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    const gridSize = 20;
    const tileCount = 20; // 400x400 canvas

    let snake = $state([{ x: 10, y: 10 }]);
    let prevSnake = [{ x: 10, y: 10 }]; // Digunakan untuk animasi mulus (Lerp)
    let food = $state({ x: 15, y: 15 });

    let dx = $state(0);
    let dy = $state(0);
    let score = $state(0);
    let highScore = $state(0);
    let isGameOver = $state(false);
    let isPlaying = $state(false);

    // Konfigurasi Kecepatan Dinamis & Animasi Mulus
    let animationFrameId: number;
    let lastLogicTime = 0;
    const initialSpeed = 160; // Kecepatan awal
    let currentSpeed = $state(initialSpeed);
    let changingDirection = false;

    // Derived speed percentage
    let speedPercent = $derived(
        currentSpeed === initialSpeed ? 0 : Math.min(100, Math.round(((initialSpeed - currentSpeed) / (initialSpeed - 50)) * 100))
    );

    // Camera shake and particles
    let lastEatTime = 0;

    interface Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;
        size: number;
        birthTime: number;
        lifeTime: number;
    }
    let particles: Particle[] = $state([]);

    interface FloatingText {
        x: number;
        y: number;
        text: string;
        opacity: number;
        birthTime: number;
    }
    let floatingTexts: FloatingText[] = $state([]);

    // Sound Synthesizer logic (Web Audio API)
    let audioCtx: AudioContext | null = null;
    let musicInterval: any = null;
    let isMuted = $state(false);
    let scoreAlreadyBeatenHighScore = false;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    function playNote(freq: number, type: OscillatorType, duration: number, volume: number = 0.05) {
        initAudio();
        if (!audioCtx || isMuted) return;
        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.error("Audio error", e);
        }
    }

    let musicStep = 0;
    const melody = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66]; // C4, D4, E4, F4, G4, F4, E4, D4

    function startMusic() {
        initAudio();
        if (musicInterval) clearInterval(musicInterval);
        musicStep = 0;
        
        musicInterval = setInterval(() => {
            if (!isPlaying || isGameOver || isMuted) {
                stopMusic();
                return;
            }
            const note = melody[musicStep % melody.length];
            playNote(note / 2, "triangle", 0.35, 0.03); // Triangle bass notes
            
            if (musicStep % 2 === 0) {
                playNote(melody[(musicStep + 2) % melody.length], "square", 0.15, 0.012); // Square treble
            }
            
            musicStep++;
        }, 220);
    }

    function stopMusic() {
        if (musicInterval) {
            clearInterval(musicInterval);
            musicInterval = null;
        }
    }

    function playEatSound() {
        initAudio();
        if (!audioCtx || isMuted) return;
        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(300, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.12);
            
            gainNode.gain.setValueAtTime(0.07, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.12);
        } catch (e) {
            console.error("Audio error", e);
        }
    }

    function playHighScoreSound() {
        initAudio();
        if (!audioCtx || isMuted) return;
        try {
            // retro arpeggio fanfare
            playNote(523.25, "square", 0.15, 0.05); // C5
            setTimeout(() => playNote(659.25, "square", 0.15, 0.05), 100); // E5
            setTimeout(() => playNote(783.99, "square", 0.3, 0.05), 200); // G5
        } catch (e) {
            console.error("Audio error", e);
        }
    }

    function playDeathSound() {
        initAudio();
        if (!audioCtx || isMuted) return;
        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(300, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.35);
            
            gainNode.gain.setValueAtTime(0.07, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.35);
        } catch (e) {
            console.error("Audio error", e);
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            stopMusic();
        } else if (isPlaying && !isGameOver) {
            startMusic();
        }
    }

    function startGame() {
        if (isPlaying) return;
        cancelAnimationFrame(animationFrameId);

        // Reset state
        snake = [{ x: 10, y: 10 }];
        prevSnake = [{ x: 10, y: 10 }];
        dx = 1;
        dy = 0;
        score = 0;
        currentSpeed = initialSpeed;
        isGameOver = false;
        isPlaying = true;
        changingDirection = false;
        scoreAlreadyBeatenHighScore = false;

        placeFood();
        startMusic();

        // Mulai Game Engine
        lastLogicTime = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);

        // Auto scroll ke game
        document
            .getElementById("game-section")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function stopGame() {
        isPlaying = false;
        isGameOver = true;
        cancelAnimationFrame(animationFrameId);

        // Huge screen shake on death
        lastEatTime = performance.now() + 150;
        stopMusic();
        playDeathSound();

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore.toString());
        }
        draw(1); // Paksa render di posisi akhir
    }

    // Engine loop 60fps+ untuk animasi mulus
    function gameLoop(time: number) {
        if (!isPlaying) return;

        let delta = time - lastLogicTime;

        // Logic Tick (Pergerakan Grid)
        if (delta >= currentSpeed) {
            gameStep();
            lastLogicTime = time;
            delta = 0;
        }

        // Render Frame
        if (isPlaying) {
            const progress = Math.min(1, delta / currentSpeed);
            draw(progress);
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    function gameStep() {
        changingDirection = false;
        prevSnake = snake.map((s) => ({ ...s }));

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Tabrak Dinding
        if (
            head.x < 0 ||
            head.x >= tileCount ||
            head.y < 0 ||
            head.y >= tileCount
        ) {
            return stopGame();
        }

        // Tabrak Badan Sendiri
        for (let part of snake) {
            if (part.x === head.x && part.y === head.y) return stopGame();
        }

        snake.unshift(head);

        // Makan Food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            
            // Trigger Camera Shake & Particles & Floating Text
            lastEatTime = performance.now();
            playEatSound();
            
            const colors = ["#2563eb", "#ffd200", "#dc2626"];
            const burstX = food.x * gridSize + gridSize / 2;
            const burstY = food.y * gridSize + gridSize / 2;
            
            // Spawn 12 particles
            for (let k = 0; k < 12; k++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 2.5;
                particles.push({
                    x: burstX,
                    y: burstY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 2 + Math.random() * 3,
                    birthTime: performance.now(),
                    lifeTime: 400 + Math.random() * 300
                });
            }
            
            // Check High Score Exceeded
            if (score > highScore) {
                if (!scoreAlreadyBeatenHighScore && highScore > 0) {
                    scoreAlreadyBeatenHighScore = true;
                    playHighScoreSound();
                    floatingTexts.push({
                        x: burstX,
                        y: food.y * gridSize - 22,
                        text: "NEW BEST!",
                        opacity: 1,
                        birthTime: performance.now()
                    });
                }
                highScore = score;
                localStorage.setItem("snakeHighScore", highScore.toString());
            }

            // Spawn floating score pop-up
            floatingTexts.push({
                x: burstX,
                y: food.y * gridSize - 5,
                text: "+10",
                opacity: 1,
                birthTime: performance.now()
            });

            placeFood();

            // ⚡ Percepatan Dinamis
            currentSpeed = Math.max(50, initialSpeed - (score / 10) * 3);
            prevSnake.push({ ...prevSnake[prevSnake.length - 1] });
        } else {
            snake.pop();
        }
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };
        for (let part of snake) {
            if (part.x === food.x && part.y === food.y) return placeFood();
        }
    }

    function draw(progress = 1) {
        if (!ctx) return;

        ctx.save();

        // ── Camera Shake Translation ──
        const timeNow = performance.now();
        if (timeNow - lastEatTime < 180) {
            const dxShake = (Math.random() - 0.5) * 8;
            const dyShake = (Math.random() - 0.5) * 8;
            ctx.translate(dxShake, dyShake);
        }

        // Bersihkan canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Animasi Denyut Makanan
        const foodPulse = 1 + Math.sin(timeNow / 150) * 0.15;
        const fx = food.x * gridSize + gridSize / 2;
        const fy = food.y * gridSize + gridSize / 2;

        // Food core
        ctx.shadowBlur = 16;
        ctx.shadowColor = "#dc2626";
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(
            fx,
            fy,
            (gridSize / 2 - 4) * foodPulse,
            0,
            Math.PI * 2,
        );
        ctx.fill();

        // Outer orbital ring
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(220, 38, 38, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(
            fx,
            fy,
            (gridSize / 2 + 1) * foodPulse,
            0,
            Math.PI * 2,
        );
        ctx.stroke();

        // Menggambar Ular Mulus
        for (let i = snake.length - 1; i >= 0; i--) {
            const part = snake[i];
            const prev = prevSnake[i] || part;

            // Interpolasi Linear (Lerp)
            const vx = prev.x + (part.x - prev.x) * progress;
            const vy = prev.y + (part.y - prev.y) * progress;

            const cx = vx * gridSize + gridSize / 2;
            const cy = vy * gridSize + gridSize / 2;

            if (i === 0) {
                // Kepala Ular - Glowing Cyber Gradient
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(37, 99, 235, 0.6)";

                let headGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, gridSize / 2);
                headGrad.addColorStop(0, "#3b82f6");
                headGrad.addColorStop(1, "#1d4ed8");
                ctx.fillStyle = headGrad;

                ctx.beginPath();
                ctx.roundRect(
                    vx * gridSize,
                    vy * gridSize,
                    gridSize,
                    gridSize,
                    6,
                );
                ctx.fill();

                // Mata Ular Dinamis dengan Pupil
                ctx.shadowBlur = 0;
                ctx.fillStyle = "#ffffff";
                const eyeGap = 4;

                let eye1 = { x: cx, y: cy };
                let eye2 = { x: cx, y: cy };

                if (dy === -1) {
                    eye1 = { x: cx - eyeGap, y: cy - eyeGap };
                    eye2 = { x: cx + eyeGap, y: cy - eyeGap };
                } else if (dy === 1) {
                    eye1 = { x: cx - eyeGap, y: cy + eyeGap };
                    eye2 = { x: cx + eyeGap, y: cy + eyeGap };
                } else if (dx === -1) {
                    eye1 = { x: cx - eyeGap, y: cy - eyeGap };
                    eye2 = { x: cx - eyeGap, y: cy + eyeGap };
                } else if (dx === 1) {
                    eye1 = { x: cx + eyeGap, y: cy - eyeGap };
                    eye2 = { x: cx + eyeGap, y: cy + eyeGap };
                } else {
                    eye1 = { x: cx + eyeGap, y: cy - eyeGap };
                    eye2 = { x: cx + eyeGap, y: cy + eyeGap };
                }

                ctx.beginPath();
                ctx.arc(eye1.x, eye1.y, 3, 0, Math.PI * 2);
                ctx.arc(eye2.x, eye2.y, 3, 0, Math.PI * 2);
                ctx.fill();

                // Pupil Hitam
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(eye1.x + dx * 0.8, eye1.y + dy * 0.8, 1.2, 0, Math.PI * 2);
                ctx.arc(eye2.x + dx * 0.8, eye2.y + dy * 0.8, 1.2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Badan Ular Memudar & Berpola Cyber
                let alpha = Math.max(0.2, 1 - (i / snake.length) * 0.75);
                ctx.fillStyle = i % 2 === 0 ? `rgba(37, 99, 235, ${alpha})` : `rgba(59, 130, 246, ${alpha})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "rgba(37, 99, 235, 0.3)";
                
                ctx.beginPath();
                ctx.roundRect(
                    vx * gridSize + 2,
                    vy * gridSize + 2,
                    gridSize - 4,
                    gridSize - 4,
                    5,
                );
                ctx.fill();
            }
        }

        // ── Render Particles ──
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const age = timeNow - p.birthTime;
            if (age > p.lifeTime) {
                particles.splice(i, 1);
                continue;
            }
            const progressRatio = age / p.lifeTime;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95; // Drag
            p.vy *= 0.95;

            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 - progressRatio), 0, Math.PI * 2);
            ctx.fill();
        }

        // ── Render Floating Score Text ──
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
            const ft = floatingTexts[i];
            const age = timeNow - ft.birthTime;
            if (age > 600) {
                floatingTexts.splice(i, 1);
                continue;
            }
            const progressRatio = age / 600;
            const yOffset = progressRatio * -25;
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(255, 210, 0, ${1 - progressRatio})`;
            ctx.font = "bold 13px 'Plus Jakarta Sans'";
            ctx.textAlign = "center";
            ctx.fillText(ft.text, ft.x, ft.y + yOffset);
        }

        ctx.restore();
    }

    function handleKey(e: KeyboardEvent) {
        if (!isPlaying || changingDirection) return;
        const key = e.key;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key))
            e.preventDefault();

        if (key === "ArrowUp" && dy === 0) {
            dx = 0;
            dy = -1;
            changingDirection = true;
        }
        if (key === "ArrowDown" && dy === 0) {
            dx = 0;
            dy = 1;
            changingDirection = true;
        }
        if (key === "ArrowLeft" && dx === 0) {
            dx = -1;
            dy = 0;
            changingDirection = true;
        }
        if (key === "ArrowRight" && dx === 0) {
            dx = 1;
            dy = 0;
            changingDirection = true;
        }
    }

    function setDirection(newDx: number, newDy: number) {
        if (!isPlaying || changingDirection) return;
        if (newDx !== 0 && dx === 0) {
            dx = newDx;
            dy = 0;
            changingDirection = true;
        }
        if (newDy !== 0 && dy === 0) {
            dx = 0;
            dy = newDy;
            changingDirection = true;
        }
    }

    onMount(() => {
        const savedScore = localStorage.getItem("snakeHighScore");
        if (savedScore) highScore = parseInt(savedScore, 10);

        if (canvas) {
            ctx = canvas.getContext("2d")!;
            draw();
        }
        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
            cancelAnimationFrame(animationFrameId);
            stopMusic();
            if (audioCtx) {
                audioCtx.close();
            }
        };
    });
</script>

<section id="game-section" class="section">
    <div class="container">
        <!-- Header -->
        <div class="reveal reveal-zoom-out" style="margin-bottom:48px;">
            <div class="section-label">
                <Gamepad2 size={12} /> Coffee Break
            </div>
            <h2 class="section-title">Istirahat Sebentar.</h2>
        </div>

        <div class="game-wrapper reveal reveal-slide-up">
            <div class="game-info">
                <p class="game-desc">
                    Mata lelah melihat barisan kode? Pecahkan rekor <strong
                        >High Score</strong
                    >
                    di simulator smooth ini.
                    <strong class="text-red"
                        >Hati-hati, ular akan melaju semakin cepat!</strong
                    >
                </p>

                <div class="stats-board">
                    <div class="score-card">
                        <span class="score-lbl">Score Anda</span>
                        <span class="score-num text-blue">{score}</span>
                    </div>
                    <div class="score-divider"></div>
                    <div class="score-card best-score">
                        <span class="score-lbl">High Score</span>
                        <span class="score-num text-yellow">
                            <Trophy
                                size={18}
                                strokeWidth={2.5}
                                class="trophy-icon"
                            />{highScore}
                        </span>
                    </div>
                </div>

                <div class="speedometer-wrap">
                    <div class="speedometer-header">
                        <span class="speedometer-lbl">Snake Engine Boost</span>
                        <span class="speedometer-val">{speedPercent}%</span>
                    </div>
                    <div class="speedometer-track">
                        <div class="speedometer-fill" style="width: {speedPercent}%"></div>
                    </div>
                </div>

                <div class="game-actions">
                    {#if !isPlaying}
                        <button
                            class="btn-primary start-btn"
                            onclick={startGame}
                        >
                            {#if isGameOver}
                                <RotateCcw size={18} /> Main Lagi
                            {:else}
                                <Play size={18} /> Mulai Bermain
                            {/if}
                        </button>
                    {/if}
                </div>

                <p class="game-hint">
                    <strong style="color: var(--ink);">KONTROL:</strong> Gunakan
                    tombol panah di keyboard Anda atau D-pad pada layar smartphone.
                </p>
            </div>

            <div class="arcade-cabinet">
                <div class="arcade-header">
                    <div class="arcade-title-pills">
                        <span></span><span></span><span></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button class="mute-btn" onclick={toggleMute} aria-label="Toggle mute" type="button">
                            {#if isMuted}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
                            {:else}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                            {/if}
                        </button>
                        {#if isPlaying}
                            <div class="live-indicator">
                                <span class="live-dot"></span> LIVE
                            </div>
                        {/if}
                    </div>
                </div>

                <div class="arcade-screen-container">
                    <div class="arcade-screen">
                        <canvas
                            bind:this={canvas}
                            width="400"
                            height="400"
                            class="snake-canvas"
                        ></canvas>

                        {#if !isPlaying}
                            <div
                                class="game-overlay"
                                class:is-gameover={isGameOver}
                            >
                                <div class="overlay-content">
                                    {#if isGameOver}
                                        <h3 class="gameover-title">
                                            GAME OVER
                                        </h3>
                                        <p class="gameover-score">
                                            SKOR AKHIR: <strong>{score}</strong>
                                        </p>
                                    {:else}
                                        <div class="icon-pulse">
                                            <Gamepad2
                                                size={48}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <p class="overlay-text">SISTEM SIAP</p>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>

                <div class="mobile-dpad-grid">
                    <button
                        class="dpad-key dpad-up"
                        aria-label="Up"
                        onclick={() => setDirection(0, -1)}
                    >
                        <ChevronUp size={24} />
                    </button>
                    <button
                        class="dpad-key dpad-left"
                        aria-label="Left"
                        onclick={() => setDirection(-1, 0)}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div class="dpad-core"></div>
                    <button
                        class="dpad-key dpad-right"
                        aria-label="Right"
                        onclick={() => setDirection(1, 0)}
                    >
                        <ChevronRight size={24} />
                    </button>
                    <button
                        class="dpad-key dpad-down"
                        aria-label="Down"
                        onclick={() => setDirection(0, 1)}
                    >
                        <ChevronDown size={24} />
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* ── LAYOUT UTAMA MODERN ── */
    /* Hapus .compact-section agar jarak antar section kembali normal / konsisten */

    .game-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
        background: transparent;
        border-radius: 32px;
    }

    .game-info {
        display: flex;
        flex-direction: column;
    }

    .game-desc {
        font-size: 1rem;
        color: var(--ink);
        line-height: 1.6;
        margin-bottom: 32px;
        opacity: 0.85;
    }

    /* ── MODERN DASHBOARD STATS ── */
    .stats-board {
        display: flex;
        align-items: center;
        background: rgba(var(--ink-rgb), 0.03);
        border: 1px solid rgba(var(--ink-rgb), 0.1);
        border-radius: 20px;
        padding: 8px;
        margin-bottom: 36px;
        width: fit-content;
        backdrop-filter: blur(8px);
    }

    .score-card {
        display: flex;
        flex-direction: column;
        padding: 12px 24px;
        min-width: 140px;
    }

    .score-divider {
        width: 1px;
        height: 40px;
        background: rgba(var(--ink-rgb), 0.1);
    }

    .score-card.best-score {
        background: rgba(var(--ink-rgb), 0.02);
        border-radius: 12px;
    }

    .score-lbl {
        font-family: var(--font-head);
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 4px;
        color: var(--ink);
        opacity: 0.6;
    }

    .score-num {
        font-family: var(--font-head);
        font-size: 2rem;
        font-weight: 800;
        line-height: 1;
        display: flex;
        align-items: baseline;
    }

    .text-blue {
        color: var(--blue);
    }
    .text-yellow {
        color: var(--yellow);
    }
    .text-red {
        color: var(--red);
    }

    /* ── BUTTONS & ACTIONS ── */
    .game-actions {
        min-height: 56px;
    }

    .start-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--ink);
        color: var(--white);
        padding: 16px 36px;
        border-radius: 99px;
        font-family: var(--font-head);
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: 1px solid var(--ink);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .start-btn:hover {
        transform: translateY(-3px);
    }

    .start-btn:active {
        transform: translateY(2px);
    }

    .game-hint {
        margin-top: 24px;
        font-size: 0.8rem;
        line-height: 1.5;
        color: var(--ink);
        opacity: 0.6;
        font-weight: 500;
    }

    /* ── ARCADE MONITOR (Sleek Glassmorphism) ── */
    .arcade-cabinet {
        background: rgba(var(--ink-rgb), 0.02);
        border: 1.5px solid var(--ink);
        border-radius: 28px;
        padding: 24px;
        position: relative;
        box-shadow: 6px 6px 0px rgba(var(--ink-rgb), 0.05);
    }

    .arcade-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 0 8px;
    }

    .arcade-title-pills {
        display: flex;
        gap: 6px;
    }
    .arcade-title-pills span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    .arcade-title-pills span:nth-child(1) {
        background: var(--blue);
        box-shadow: 0 0 8px var(--blue);
    }
    .arcade-title-pills span:nth-child(2) {
        background: var(--yellow);
        box-shadow: 0 0 8px var(--yellow);
    }
    .arcade-title-pills span:nth-child(3) {
        background: var(--pink);
        box-shadow: 0 0 8px var(--pink);
    }

    .live-indicator {
        font-family: var(--font-head);
        font-size: 0.65rem;
        font-weight: 800;
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 6px;
        letter-spacing: 0.1em;
    }

    .live-dot {
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        animation: pulse-dot 1.2s infinite;
        box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
    }

    @keyframes pulse-dot {
        0%,
        100% {
            opacity: 0.4;
        }
        50% {
            opacity: 1;
        }
    }

    /* LAYAR CANVAS MENDUKUNG DARK MODE */
    .arcade-screen-container {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        border: 1.5px solid var(--ink);
        background: var(--bg); /* Otomatis berubah di Dark Mode */
        box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .arcade-screen-container::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
                rgba(18, 16, 16, 0) 50%,
                rgba(0, 0, 0, 0.04) 50%
            ),
            linear-gradient(
                90deg,
                rgba(255, 0, 0, 0.008),
                rgba(0, 255, 0, 0.004),
                rgba(0, 0, 255, 0.008)
            );
        background-size:
            100% 4px,
            6px 100%;
        z-index: 5;
        pointer-events: none;
        opacity: 0.85;
    }

    .arcade-screen {
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        /* GRID CSS agar otomatis adaptif warna terang/gelap */
        background-image: radial-gradient(
            circle at 10px 10px,
            rgba(var(--ink-rgb), 0.08) 1.5px,
            transparent 1.5px
        );
        background-size: 20px 20px;
        animation: crt-flicker 0.15s infinite;
    }
    @keyframes crt-flicker {
        0% {
            opacity: 0.99;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.98;
        }
    }

    .snake-canvas {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        z-index: 2;
    }

    /* OVERLAY HTML (Sempurna untuk Dark Mode) */
    .game-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--bg-rgb), 0.75); /* Tembus pandang keren */
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 10;
        transition: opacity 0.3s ease;
    }

    .game-overlay.is-gameover {
        background: rgba(var(--ink-rgb), 0.85); /* Gelap saat kalah */
    }

    .overlay-content {
        text-align: center;
        color: var(--ink);
    }
    .is-gameover .overlay-content {
        color: var(--bg);
    } /* Balik warna font saat kalah */

    .icon-pulse {
        display: inline-flex;
        margin-bottom: 16px;
        opacity: 0.8;
        animation: float-icon 3s ease-in-out infinite;
    }

    @keyframes float-icon {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    .overlay-text {
        font-family: var(--font-head);
        font-weight: 800;
        font-size: 0.9rem;
        letter-spacing: 0.15em;
        opacity: 0.7;
    }

    .gameover-title {
        font-family: var(--font-head);
        font-size: 2.2rem;
        font-weight: 900;
        letter-spacing: 0.05em;
        margin-bottom: 8px;
    }

    .gameover-score {
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.9;
        letter-spacing: 0.05em;
    }
    .gameover-score strong {
        font-size: 1.2rem;
    }

    /* ── KONTROL D-PAD MOBILE (Tactile Console Design) ── */
    .mobile-dpad-grid {
        display: none;
        grid-template-columns: repeat(3, 52px);
        grid-template-rows: repeat(3, 52px);
        grid-template-areas:
            ". up ."
            "left core right"
            ". down .";
        gap: 8px;
        justify-content: center;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid rgba(var(--ink-rgb), 0.08);
    }

    .dpad-key {
        background: var(--white);
        border: 1.5px solid var(--ink);
        color: var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 14px;
        box-shadow: 0 5px 0 var(--ink);
        transition:
            transform 0.1s,
            box-shadow 0.1s,
            background-color 0.2s;
    }

    .dpad-key:hover {
        background: rgba(var(--ink-rgb), 0.03);
    }

    .dpad-key:active {
        transform: translateY(4px);
        box-shadow: 0 1px 0 var(--ink);
        background: var(--ink);
        color: var(--bg);
    }

    .dpad-up {
        grid-area: up;
    }
    .dpad-left {
        grid-area: left;
    }
    .dpad-right {
        grid-area: right;
    }
    .dpad-down {
        grid-area: down;
    }
    .dpad-core {
        grid-area: core;
        background: rgba(var(--ink-rgb), 0.03);
        border-radius: 12px;
        border: 1.5px dashed rgba(var(--ink-rgb), 0.15);
    }

    /* ── RESPONSIVE TWEAKS ── */
    @media (max-width: 1024px) {
        .game-wrapper {
            grid-template-columns: 1fr;
            gap: 48px;
        }
        .stats-board {
            width: 100%;
            justify-content: space-around;
        }
        .score-card {
            align-items: center;
        }
        .mobile-dpad-grid {
            display: grid;
        }
    }

    @media (max-width: 640px) {
        .stats-board {
            flex-direction: column;
            width: 100%;
            padding: 16px;
        }
        .score-divider {
            width: 100%;
            height: 1px;
            margin: 8px 0;
        }
        .score-card {
            padding: 8px;
            align-items: center;
        }
    }

    /* Speedometer Boost Bar styling */
    .speedometer-wrap {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 36px;
        max-width: 320px;
        background: rgba(var(--ink-rgb), 0.02);
        border: 1.5px solid var(--ink);
        border-radius: 12px;
        padding: 12px 16px;
    }
    .speedometer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .speedometer-lbl {
        font-family: var(--font-head);
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ink);
        opacity: 0.6;
    }
    .speedometer-val {
        font-family: var(--font-head);
        font-size: 0.8rem;
        font-weight: 800;
        color: var(--accent);
    }
    .speedometer-track {
        height: 8px;
        background: rgba(var(--ink-rgb), 0.08);
        border-radius: 99px;
        overflow: hidden;
        position: relative;
    }
    /* Speedometer fill */
    .speedometer-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--blue), var(--yellow));
        border-radius: 99px;
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Mute button styling */
    .mute-btn {
        background: transparent;
        border: none;
        color: var(--ink);
        opacity: 0.6;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        transition: opacity 0.2s, transform 0.2s;
    }
    .mute-btn:hover {
        opacity: 1;
        transform: scale(1.1);
    }
</style>
