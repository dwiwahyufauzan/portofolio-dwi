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
        Volume2,
        VolumeX,
        Sparkles,
        Zap
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

    // Touch Swipe State
    let touchStartX = 0;
    let touchStartY = 0;

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
            playNote(note / 2, "triangle", 0.35, 0.03);
            
            if (musicStep % 2 === 0) {
                playNote(melody[(musicStep + 2) % melody.length], "square", 0.15, 0.012);
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
            osc.frequency.setValueAtTime(320, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(960, audioCtx.currentTime + 0.12);
            
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
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
            osc.frequency.setValueAtTime(320, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.35);
            
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
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

    function triggerHapticFeedback() {
        if (typeof window !== "undefined" && "vibrate" in navigator) {
            try {
                navigator.vibrate(12);
            } catch (e) {}
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
        triggerHapticFeedback();

        // Mulai Game Engine
        lastLogicTime = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
        isPlaying = false;
        isGameOver = true;
        cancelAnimationFrame(animationFrameId);

        // Screen shake on death
        lastEatTime = performance.now() + 150;
        stopMusic();
        playDeathSound();

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore.toString());
        }
    }

    function gameLoop(time: number) {
        if (!lastLogicTime) lastLogicTime = time;
        let delta = time - lastLogicTime;

        while (delta >= currentSpeed) {
            gameStep();
            lastLogicTime += currentSpeed;
            delta = time - lastLogicTime;
            if (!isPlaying) return;
        }

        if (isPlaying) {
            const progress = Math.min(1, Math.max(0, delta / currentSpeed));
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
            
            lastEatTime = performance.now();
            playEatSound();
            triggerHapticFeedback();
            
            const colors = ["#2563eb", "#ffd200", "#dc2626"];
            const burstX = food.x * gridSize + gridSize / 2;
            const burstY = food.y * gridSize + gridSize / 2;
            
            // Spawn 14 particle burst
            for (let k = 0; k < 14; k++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 3.0;
                particles.push({
                    x: burstX,
                    y: burstY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 2.5 + Math.random() * 3,
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

            // Percepatan Dinamis
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

        const timeNow = performance.now();
        if (timeNow - lastEatTime < 120) {
            const shake = (120 - (timeNow - lastEatTime)) / 25;
            ctx.translate(
                (Math.random() - 0.5) * shake,
                (Math.random() - 0.5) * shake
            );
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ── Smooth Step Interpolation (0.5 - Cosine curve for silky flow) ──
        const clampedProgress = Math.min(1, Math.max(0, progress));
        const smoothProgress = 0.5 - Math.cos(clampedProgress * Math.PI) / 2;

        // Calculate sub-pixel lerp positions for all segments
        const lerpPoints: { x: number; y: number }[] = [];
        for (let i = 0; i < snake.length; i++) {
            const curr = snake[i];
            const prev = prevSnake[i] || curr;

            const lx = prev.x + (curr.x - prev.x) * smoothProgress;
            const ly = prev.y + (curr.y - prev.y) * smoothProgress;

            lerpPoints.push({
                x: lx * gridSize + gridSize / 2,
                y: ly * gridSize + gridSize / 2
            });
        }

        // ── Render Glowing Target (Apple / Star) ──
        const fx = food.x * gridSize + gridSize / 2;
        const fy = food.y * gridSize + gridSize / 2;
        const pulse = 1 + Math.sin(timeNow / 120) * 0.12;

        // Outer Glow Ring
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#dc2626";
        ctx.fillStyle = "rgba(220, 38, 38, 0.2)";
        ctx.beginPath();
        ctx.arc(fx, fy, (gridSize / 2 + 4) * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Shiny Target Core
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#ffd200";
        const foodGradient = ctx.createRadialGradient(fx - 2, fy - 2, 1, fx, fy, gridSize / 2);
        foodGradient.addColorStop(0, "#ffd200");
        foodGradient.addColorStop(0.7, "#dc2626");
        foodGradient.addColorStop(1, "#991b1b");

        ctx.fillStyle = foodGradient;
        ctx.beginPath();
        ctx.arc(fx, fy, (gridSize / 2 - 2) * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Target Leaf/Crown
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#2563eb";
        ctx.beginPath();
        ctx.ellipse(fx, fy - gridSize / 2 + 1, 3, 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // ── Render Organic Glowing Ribbon Body ──
        if (lerpPoints.length > 1) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(37, 99, 235, 0.6)";
            ctx.lineWidth = gridSize - 4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const bodyGradient = ctx.createLinearGradient(
                lerpPoints[0].x, lerpPoints[0].y,
                lerpPoints[lerpPoints.length - 1].x, lerpPoints[lerpPoints.length - 1].y
            );
            bodyGradient.addColorStop(0, "#2563eb");
            bodyGradient.addColorStop(0.5, "#3b82f6");
            bodyGradient.addColorStop(1, "#60a5fa");

            ctx.strokeStyle = bodyGradient;
            ctx.beginPath();
            ctx.moveTo(lerpPoints[0].x, lerpPoints[0].y);
            for (let i = 1; i < lerpPoints.length; i++) {
                ctx.lineTo(lerpPoints[i].x, lerpPoints[i].y);
            }
            ctx.stroke();
        }

        // ── Render Head & Dynamic Eyes ──
        if (lerpPoints.length > 0) {
            const hx = lerpPoints[0].x;
            const hy = lerpPoints[0].y;

            // Head Glow Circle
            ctx.shadowBlur = 14;
            ctx.shadowColor = "#2563eb";
            ctx.fillStyle = "#2563eb";
            ctx.beginPath();
            ctx.arc(hx, hy, gridSize / 2 - 1, 0, Math.PI * 2);
            ctx.fill();

            // Calculate Dynamic Eye Positions based on direction
            ctx.shadowBlur = 0;
            let eye1X = hx - 4, eye1Y = hy - 4;
            let eye2X = hx + 4, eye2Y = hy - 4;
            let pupilDx = 0, pupilDy = 0;

            if (dx === 1) {
                eye1X = hx + 3; eye1Y = hy - 4;
                eye2X = hx + 3; eye2Y = hy + 4;
                pupilDx = 1.2;
            } else if (dx === -1) {
                eye1X = hx - 3; eye1Y = hy - 4;
                eye2X = hx - 3; eye2Y = hy + 4;
                pupilDx = -1.2;
            } else if (dy === 1) {
                eye1X = hx - 4; eye1Y = hy + 3;
                eye2X = hx + 4; eye2Y = hy + 3;
                pupilDy = 1.2;
            } else if (dy === -1) {
                eye1X = hx - 4; eye1Y = hy - 3;
                eye2X = hx + 4; eye2Y = hy - 3;
                pupilDy = -1.2;
            }

            // White Sclera
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(eye1X, eye1Y, 3, 0, Math.PI * 2);
            ctx.arc(eye2X, eye2Y, 3, 0, Math.PI * 2);
            ctx.fill();

            // Pupil
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(eye1X + pupilDx, eye1Y + pupilDy, 1.4, 0, Math.PI * 2);
            ctx.arc(eye2X + pupilDx, eye2Y + pupilDy, 1.4, 0, Math.PI * 2);
            ctx.fill();
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
            p.vx *= 0.95;
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
            ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
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
            triggerHapticFeedback();
        }
        if (key === "ArrowDown" && dy === 0) {
            dx = 0;
            dy = 1;
            changingDirection = true;
            triggerHapticFeedback();
        }
        if (key === "ArrowLeft" && dx === 0) {
            dx = -1;
            dy = 0;
            changingDirection = true;
            triggerHapticFeedback();
        }
        if (key === "ArrowRight" && dx === 0) {
            dx = 1;
            dy = 0;
            changingDirection = true;
            triggerHapticFeedback();
        }
    }

    function setDirection(newDx: number, newDy: number) {
        if (!isPlaying || changingDirection) return;
        if (newDx !== 0 && dx === 0) {
            dx = newDx;
            dy = 0;
            changingDirection = true;
            triggerHapticFeedback();
        }
        if (newDy !== 0 && dy === 0) {
            dx = 0;
            dy = newDy;
            changingDirection = true;
            triggerHapticFeedback();
        }
    }

    function handleTouchStart(e: TouchEvent) {
        if (e.touches.length > 0) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }

    function handleTouchEnd(e: TouchEvent) {
        if (e.changedTouches.length > 0) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            const minSwipeDistance = 20;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > minSwipeDistance) {
                    if (diffX > 0) setDirection(1, 0);
                    else setDirection(-1, 0);
                }
            } else {
                if (Math.abs(diffY) > minSwipeDistance) {
                    if (diffY > 0) setDirection(0, 1);
                    else setDirection(0, -1);
                }
            }
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
        <!-- Section Header -->
        <div class="reveal reveal-zoom-out" style="margin-bottom:36px;">
            <div class="section-label">
                <Gamepad2 size={12} /> Coffee Break Mini Game
            </div>
            <h2 class="section-title">Istirahat Sebentar.</h2>
        </div>

        <div class="game-wrapper reveal reveal-slide-up">
            <!-- Left Info Column -->
            <div class="game-info">
                <p class="game-desc">
                    Mata lelah melihat barisan kode? Uji refleks & pecahkan rekor <strong>High Score</strong> di arcade simulator ini.
                    <strong class="text-red">Hati-hati, ular akan melaju semakin cepat!</strong>
                </p>

                <!-- Dashboard Stats -->
                <div class="stats-board">
                    <div class="score-card">
                        <span class="score-lbl">Skor Anda</span>
                        <span class="score-num text-blue">{score}</span>
                    </div>
                    <div class="score-divider"></div>
                    <div class="score-card best-score">
                        <span class="score-lbl">Rekor Terbaik</span>
                        <span class="score-num text-yellow">
                            <Trophy size={18} strokeWidth={2.5} class="trophy-icon" />
                            {highScore}
                        </span>
                    </div>
                </div>

                <!-- Speedometer Engine Boost -->
                <div class="speedometer-wrap">
                    <div class="speedometer-header">
                        <span class="speedometer-lbl">
                            <Zap size={12} style="display:inline-block; vertical-align:middle; margin-right:4px;" />
                            Snake Engine Boost
                        </span>
                        <span class="speedometer-val">{speedPercent}%</span>
                    </div>
                    <div class="speedometer-track">
                        <div class="speedometer-fill" style="width: {speedPercent}%"></div>
                    </div>
                </div>

                <!-- Start Action Button -->
                <div class="game-actions">
                    {#if !isPlaying}
                        <button class="btn-primary start-btn" onclick={startGame} type="button">
                            {#if isGameOver}
                                <RotateCcw size={18} /> Main Lagi
                            {:else}
                                <Play size={18} /> Mulai Bermain
                            {/if}
                        </button>
                    {/if}
                </div>

                <p class="game-hint">
                    <strong style="color: var(--ink);">KONTROL:</strong> Pakai tombol panah di keyboard, swipe di layar canvas, atau D-pad di bawah monitor.
                </p>
            </div>

            <!-- Right Cabinet Arcade Screen Column -->
            <div class="arcade-cabinet">
                <div class="arcade-header">
                    <div class="arcade-title-pills">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="arcade-header-actions">
                        <button class="mute-btn" onclick={toggleMute} aria-label="Toggle mute" type="button">
                            {#if isMuted}
                                <VolumeX size={16} />
                            {:else}
                                <Volume2 size={16} />
                            {/if}
                        </button>
                        {#if isPlaying}
                            <div class="live-indicator">
                                <span class="live-dot"></span> LIVE
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Arcade Monitor Display -->
                <div class="arcade-screen-container">
                    <div class="arcade-screen">
                        <canvas
                            bind:this={canvas}
                            width="400"
                            height="400"
                            class="snake-canvas"
                            ontouchstart={handleTouchStart}
                            ontouchend={handleTouchEnd}
                        ></canvas>

                        {#if !isPlaying}
                            <div class="game-overlay" class:is-gameover={isGameOver}>
                                <div class="overlay-content">
                                    {#if isGameOver}
                                        <h3 class="gameover-title">GAME OVER</h3>
                                        <p class="gameover-score">
                                            SKOR AKHIR: <strong>{score}</strong>
                                        </p>
                                    {:else}
                                        <div class="icon-pulse">
                                            <Gamepad2 size={48} strokeWidth={1.5} />
                                        </div>
                                        <p class="overlay-text">SISTEM SIAP</p>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Tactile Mobile D-Pad Control -->
                <div class="mobile-dpad-wrapper">
                    <span class="dpad-hint-label">D-PAD TOUCH CONTROL</span>
                    <div class="mobile-dpad-grid">
                        <button class="dpad-key dpad-up" aria-label="Up" onclick={() => setDirection(0, -1)} type="button">
                            <ChevronUp size={22} />
                        </button>
                        <button class="dpad-key dpad-left" aria-label="Left" onclick={() => setDirection(-1, 0)} type="button">
                            <ChevronLeft size={22} />
                        </button>
                        <div class="dpad-core">
                            <Sparkles size={14} class="dpad-core-icon" />
                        </div>
                        <button class="dpad-key dpad-right" aria-label="Right" onclick={() => setDirection(1, 0)} type="button">
                            <ChevronRight size={22} />
                        </button>
                        <button class="dpad-key dpad-down" aria-label="Down" onclick={() => setDirection(0, 1)} type="button">
                            <ChevronDown size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* ── LAYOUT UTAMA GAME ── */
    .game-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        align-items: center;
    }

    .game-info {
        display: flex;
        flex-direction: column;
    }

    .game-desc {
        font-size: 1rem;
        color: var(--ink);
        line-height: 1.6;
        margin-bottom: 24px;
        font-weight: 500;
        opacity: 0.85;
    }

    /* ── DASHBOARD STATS ── */
    .stats-board {
        display: flex;
        align-items: center;
        background: rgba(var(--ink-rgb), 0.03);
        border: 1px solid rgba(var(--ink-rgb), 0.12);
        border-radius: 16px;
        padding: 6px;
        margin-bottom: 24px;
        width: fit-content;
    }

    .score-card {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        min-width: 120px;
    }

    .score-divider {
        width: 1px;
        height: 36px;
        background: rgba(var(--ink-rgb), 0.12);
    }

    .score-card.best-score {
        background: rgba(var(--ink-rgb), 0.03);
        border-radius: 12px;
    }

    .score-lbl {
        font-family: var(--font-head);
        font-size: 0.68rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 4px;
        color: var(--ink);
        opacity: 0.6;
    }

    .score-num {
        font-family: var(--font-head);
        font-size: 1.8rem;
        font-weight: 800;
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .text-blue { color: var(--blue); }
    .text-yellow { color: var(--yellow); }
    .text-red { color: var(--pink); }

    /* Speedometer Boost Bar */
    .speedometer-wrap {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 28px;
        max-width: 320px;
        background: rgba(var(--ink-rgb), 0.02);
        border: 1px solid rgba(var(--ink-rgb), 0.12);
        border-radius: 12px;
        padding: 10px 14px;
    }
    .speedometer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .speedometer-lbl {
        font-family: var(--font-head);
        font-size: 0.68rem;
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
        color: var(--blue);
    }
    .speedometer-track {
        height: 6px;
        background: rgba(var(--ink-rgb), 0.08);
        border-radius: 99px;
        overflow: hidden;
    }
    .speedometer-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--blue), var(--yellow));
        border-radius: 99px;
        transition: width 0.3s var(--ease-out);
    }

    /* Actions */
    .game-actions {
        min-height: 52px;
    }

    .start-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--ink);
        color: var(--white);
        padding: 14px 32px;
        border-radius: 99px;
        font-family: var(--font-head);
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: 1px solid var(--ink);
        cursor: pointer;
        transition: transform 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
    }

    .start-btn:hover {
        transform: translateY(-2px);
    }

    .game-hint {
        margin-top: 20px;
        font-size: 0.78rem;
        line-height: 1.5;
        color: var(--ink);
        opacity: 0.6;
        font-weight: 500;
    }

    /* ── ARCADE MONITOR CABINET ── */
    .arcade-cabinet {
        background: var(--white);
        border: 1.5px solid var(--ink);
        border-radius: 24px;
        padding: 20px;
        position: relative;
        box-shadow: 0 10px 30px rgba(var(--ink-rgb), 0.05);
    }

    .arcade-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        padding: 0 4px;
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
    .arcade-title-pills span:nth-child(1) { background: var(--blue); }
    .arcade-title-pills span:nth-child(2) { background: var(--yellow); }
    .arcade-title-pills span:nth-child(3) { background: var(--pink); }

    .arcade-header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .mute-btn {
        background: transparent;
        border: none;
        color: var(--ink);
        opacity: 0.7;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        border-radius: 50%;
        transition: transform 0.2s, background-color 0.2s;
    }
    .mute-btn:hover {
        opacity: 1;
        background: rgba(var(--ink-rgb), 0.05);
        transform: scale(1.1);
    }

    .live-indicator {
        font-family: var(--font-head);
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--blue);
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--blue);
        box-shadow: 0 0 8px var(--blue);
        animation: live-pulse 1.5s infinite ease-in-out;
    }
    @keyframes live-pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
    }

    /* Screen Frame */
    .arcade-screen-container {
        position: relative;
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        border: 1.5px solid var(--ink);
        background: var(--bg);
    }

    .arcade-screen {
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        background-image: radial-gradient(
            circle at 10px 10px,
            rgba(var(--ink-rgb), 0.06) 1.5px,
            transparent 1.5px
        );
        background-size: 20px 20px;
        touch-action: none;
    }

    .snake-canvas {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        z-index: 2;
    }

    /* Overlay Screen */
    .game-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--bg-rgb), 0.85);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 10;
        transition: opacity 0.3s var(--ease-out);
    }
    .game-overlay.is-gameover {
        background: rgba(var(--ink-rgb), 0.88);
    }

    .overlay-content {
        text-align: center;
        color: var(--ink);
        padding: 20px;
    }
    .is-gameover .overlay-content {
        color: var(--white);
    }

    .icon-pulse {
        display: inline-flex;
        margin-bottom: 12px;
        opacity: 0.85;
        animation: float-icon 3s ease-in-out infinite;
    }
    @keyframes float-icon {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }

    .overlay-text {
        font-family: var(--font-head);
        font-weight: 800;
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        opacity: 0.7;
    }

    .gameover-title {
        font-family: var(--font-head);
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: 0.05em;
        margin-bottom: 6px;
    }
    .gameover-score {
        font-size: 0.88rem;
        font-weight: 500;
        opacity: 0.9;
        letter-spacing: 0.05em;
    }
    .gameover-score strong {
        font-size: 1.15rem;
    }

    /* ── TACTILE MOBILE D-PAD CONTROL ── */
    .mobile-dpad-wrapper {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed rgba(var(--ink-rgb), 0.12);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .dpad-hint-label {
        font-family: var(--font-head);
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(var(--ink-rgb), 0.4);
    }

    .mobile-dpad-grid {
        display: grid;
        grid-template-columns: repeat(3, 56px);
        grid-template-rows: repeat(3, 56px);
        grid-template-areas:
            ". up ."
            "left core right"
            ". down .";
        gap: 6px;
        justify-content: center;
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
        box-shadow: 0 4px 0 var(--ink);
        transition: transform 0.1s var(--ease-out), box-shadow 0.1s var(--ease-out), background-color 0.15s;
    }
    .dpad-key:hover {
        background: rgba(var(--ink-rgb), 0.04);
    }
    .dpad-key:active {
        transform: translateY(3px) !important;
        box-shadow: 0 1px 0 var(--ink) !important;
        background: var(--ink);
        color: var(--white);
    }

    .dpad-up { grid-area: up; }
    .dpad-left { grid-area: left; }
    .dpad-right { grid-area: right; }
    .dpad-down { grid-area: down; }
    
    .dpad-core {
        grid-area: core;
        background: rgba(var(--ink-rgb), 0.03);
        border-radius: 12px;
        border: 1.5px dashed rgba(var(--ink-rgb), 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(var(--ink-rgb), 0.4);
    }

    /* ── RESPONSIVE MEDIA QUERIES ── */
    @media (max-width: 1024px) {
        .game-wrapper {
            grid-template-columns: 1fr;
            gap: 36px;
        }
        .arcade-cabinet {
            max-width: 460px;
            margin: 0 auto;
            width: 100%;
        }
    }

    @media (max-width: 640px) {
        .arcade-cabinet {
            padding: 14px;
            border-radius: 20px;
        }
        .stats-board {
            width: 100%;
            justify-content: space-between;
        }
        .score-card {
            padding: 8px 12px;
            min-width: 0;
            flex: 1;
        }
        .score-num {
            font-size: 1.5rem;
        }
        .speedometer-wrap {
            max-width: 100%;
        }
        .mobile-dpad-grid {
            grid-template-columns: repeat(3, 50px);
            grid-template-rows: repeat(3, 50px);
            gap: 6px;
        }
    }

    @media (max-width: 420px) {
        .mobile-dpad-grid {
            grid-template-columns: repeat(3, 46px);
            grid-template-rows: repeat(3, 46px);
            gap: 4px;
        }
    }
</style>
