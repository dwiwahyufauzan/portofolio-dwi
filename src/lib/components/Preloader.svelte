<script lang="ts">
  import { onMount } from "svelte";
  import { sound } from "$lib/utils/audio";

  const MSGS = [
    "AWAKENING...",
    "INITIALIZING DEMON CORE...",
    "UNLOCKING FORBIDDEN POWER...",
    "ENTERING THE VOID...",
    "SOUL ACCESS GRANTED...",
  ];

  // ─── STATE ────────────────────────────────────────────────
  let pct         = $state(0);
  let hidden      = $state(false);
  let loaded      = $state(false);
  let typingIdx   = $state(0);
  let isClosing   = $state(false);
  let closingProg = $state(0);

  // ─── DERIVED ──────────────────────────────────────────────
  let msgIdx     = $derived(pct < 22 ? 0 : pct < 46 ? 1 : pct < 66 ? 2 : pct < 86 ? 3 : 4);
  let displayMsg = $derived(MSGS[msgIdx].slice(0, typingIdx));

  // ─── EFFECTS ──────────────────────────────────────────────
  let _pm = -1;
  $effect(() => { const m = msgIdx; if (m !== _pm) { _pm = m; typingIdx = 0; } });

  // ─── CANVAS ENGINE ────────────────────────────────────────
  let eyeCanvas   = $state<HTMLCanvasElement | null>(null);
  let containerEl = $state<HTMLElement | null>(null);

  onMount(() => {
    if (sessionStorage.getItem('hasLoaded')) {
      pct=100; loaded=true; hidden=true;
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('preloader-active');
      return;
    }
    document.body.classList.add('loading');
    sessionStorage.setItem('hasLoaded','true');

    const ec = eyeCanvas;
    if (!ec) return;

    const setSize = () => {
      ec.width  = window.innerWidth;
      ec.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const ctx = ec.getContext('2d')!;

    // ── Eye Rendering Engine ──────────────────────────────
    let irisAngle1 = 0, irisAngle2 = 0;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let eyeOpen = 0, targetOpen = 0;
    let lastNow = performance.now();

    window.addEventListener('mousemove', e => {
      tmx = (e.clientX/window.innerWidth  - 0.5)*2;
      tmy = (e.clientY/window.innerHeight - 0.5)*2;
    });

    // Get exact theme background color (Clean #ffffff or #000000)
    const getBgColor = () => {
      return '#060606';
    };

    const drawEye = (now: number) => {
      const dt = now - lastNow; lastNow = now;

      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      eyeOpen += (targetOpen - eyeOpen) * 0.045;

      const W = ec.width, H = ec.height;
      const cx = W/2, cy = H*0.44;

      const EW = Math.min(W*0.56, 740);
      const EH = EW * 0.38;
      const bgColor = getBgColor();

      // Clear Canvas to transparent (Preloader background is handled by CSS var(--bg))
      ctx.clearRect(0,0,W,H);

      // ── Eye Clip Path ──────────────────────────────────
      const eyePath = () => {
        ctx.beginPath();
        ctx.moveTo(cx - EW/2, cy);
        ctx.bezierCurveTo(
          cx - EW*0.28, cy - EH * eyeOpen,
          cx + EW*0.28, cy - EH * eyeOpen,
          cx + EW/2, cy
        );
        ctx.bezierCurveTo(
          cx + EW*0.28, cy + EH * eyeOpen,
          cx - EW*0.28, cy + EH * eyeOpen,
          cx - EW/2, cy
        );
        ctx.closePath();
      };

      ctx.save();
      eyePath();
      ctx.clip();

      // ── Sclera Inside Eye: Pure Pitch Black Socket ─────────
      ctx.fillStyle = '#000000';
      eyePath();
      ctx.fill();

      // ── Blood Energy Veins (Glowing Red inside eye socket) ─
      if (eyeOpen > 0.25) {
        const va = Math.min((eyeOpen-0.25)/0.75, 1);
        ctx.globalAlpha = va * 0.9;
        const veins = [
          [cx-EW*0.18, cy-EH*0.02, cx-EW*0.46, cy-EH*0.18*eyeOpen, cx-EW*0.49, cy-EH*0.06*eyeOpen],
          [cx-EW*0.16, cy+EH*0.04, cx-EW*0.42, cy+EH*0.22*eyeOpen, cx-EW*0.49, cy+EH*0.10*eyeOpen],
          [cx+EW*0.18, cy-EH*0.02, cx+EW*0.46, cy-EH*0.18*eyeOpen, cx+EW*0.49, cy-EH*0.06*eyeOpen],
          [cx+EW*0.16, cy+EH*0.04, cx+EW*0.42, cy+EH*0.22*eyeOpen, cx+EW*0.49, cy+EH*0.10*eyeOpen],
          [cx-EW*0.20, cy+EH*0.08, cx-EW*0.38, cy+EH*0.28*eyeOpen],
          [cx+EW*0.20, cy+EH*0.08, cx+EW*0.38, cy+EH*0.28*eyeOpen],
        ];
        for (const v of veins) {
          ctx.beginPath();
          ctx.moveTo(v[0], v[1]);
          if (v.length === 6) ctx.quadraticCurveTo(v[2], v[3], v[4], v[5]);
          else ctx.lineTo(v[2], v[3]);
          ctx.strokeStyle = `rgba(255,20,50,0.9)`;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = '#FF0030';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      }

      // ── IRIS CENTER (RED DEMON SIGIL) ──────────────────
      if (eyeOpen > 0.08) {
        const IRIS_R = EH * 0.88 * Math.min(eyeOpen*1.5, 1);
        const ipx = cx + mx * EW*0.06;
        const ipy = cy + my * EH*0.04;

        ctx.save();
        ctx.translate(ipx, ipy);

        // Iris base 3D radial gradient (Neon Red)
        const ibg = ctx.createRadialGradient(-IRIS_R*0.2, -IRIS_R*0.25, IRIS_R*0.05, 0, 0, IRIS_R);
        ibg.addColorStop(0,   `rgba(255,40,60,${eyeOpen})`);
        ibg.addColorStop(0.22,`rgba(230,0,30,${eyeOpen})`);
        ibg.addColorStop(0.55,`rgba(170,0,18,${eyeOpen})`);
        ibg.addColorStop(0.85,`rgba(85,0,8,${eyeOpen})`);
        ibg.addColorStop(1,   `rgba(12,0,2,${eyeOpen})`);
        ctx.beginPath(); ctx.arc(0, 0, IRIS_R, 0, 6.28);
        ctx.fillStyle = ibg; ctx.fill();

        // Iris Glow Outer Edge
        ctx.beginPath(); ctx.arc(0, 0, IRIS_R, 0, 6.28);
        ctx.strokeStyle = `rgba(255,40,60,${eyeOpen*0.95})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#FF0030'; ctx.shadowBlur = 18;
        ctx.stroke(); ctx.shadowBlur = 0;

        // ── OUTER ROTATING SIGIL RING ───────────────────
        ctx.save();
        ctx.rotate(irisAngle1);
        for (let i=0;i<12;i++) {
          const a = i * Math.PI/6;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a)*IRIS_R*0.46, Math.sin(a)*IRIS_R*0.46);
          ctx.lineTo(Math.cos(a)*IRIS_R*0.90, Math.sin(a)*IRIS_R*0.90);
          ctx.strokeStyle = `rgba(255,70,80,${eyeOpen*0.85})`;
          ctx.lineWidth = i%3===0 ? 2.2 : 1.0;
          ctx.shadowColor = '#FF0020'; ctx.shadowBlur = i%3===0 ? 8 : 3;
          ctx.stroke(); ctx.shadowBlur = 0;
        }
        for (let i=0;i<8;i++) {
          const a = i * Math.PI/4;
          const tx = Math.cos(a)*IRIS_R*0.95, ty = Math.sin(a)*IRIS_R*0.95;
          const b1x = Math.cos(a-0.18)*IRIS_R*0.82, b1y = Math.sin(a-0.18)*IRIS_R*0.82;
          const b2x = Math.cos(a+0.18)*IRIS_R*0.82, b2y = Math.sin(a+0.18)*IRIS_R*0.82;
          ctx.beginPath();
          ctx.moveTo(tx,ty); ctx.lineTo(b1x,b1y); ctx.lineTo(b2x,b2y); ctx.closePath();
          ctx.fillStyle = `rgba(255,40,60,${eyeOpen*0.9})`;
          ctx.shadowColor = '#FF0030'; ctx.shadowBlur = 8;
          ctx.fill(); ctx.shadowBlur = 0;
        }
        for (const r of [IRIS_R*0.86, IRIS_R*0.54]) {
          ctx.beginPath(); ctx.arc(0,0,r,0,6.28);
          ctx.strokeStyle = `rgba(255,60,70,${eyeOpen*0.8})`;
          ctx.lineWidth = r === IRIS_R*0.86 ? 1.8 : 1.2;
          ctx.shadowColor = '#FF1030'; ctx.shadowBlur = 6;
          ctx.stroke(); ctx.shadowBlur = 0;
        }
        ctx.restore();

        // ── INNER TOMOE FLAME RING ──────────────────────
        ctx.save();
        ctx.rotate(irisAngle2);
        for (let i=0;i<3;i++) {
          const a = i * Math.PI*2/3;
          const ox = Math.cos(a)*IRIS_R*0.34, oy = Math.sin(a)*IRIS_R*0.34;
          const tangA = a + Math.PI/2;
          const c1x = ox + Math.cos(tangA)*IRIS_R*0.24;
          const c1y = oy + Math.sin(tangA)*IRIS_R*0.24;
          const c2x = Math.cos(a+1.2)*IRIS_R*0.40;
          const c2y = Math.sin(a+1.2)*IRIS_R*0.40;
          const ex  = Math.cos(a+2.0)*IRIS_R*0.22, ey = Math.sin(a+2.0)*IRIS_R*0.22;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.bezierCurveTo(c1x,c1y, c2x,c2y, ex, ey);
          ctx.bezierCurveTo(c2x*0.6,c2y*0.6, ox*0.9,oy*0.9, ox, oy);
          ctx.closePath();
          const tg = ctx.createRadialGradient(ox,oy,0,ox,oy,IRIS_R*0.28);
          tg.addColorStop(0, `rgba(255,90,90,${eyeOpen})`);
          tg.addColorStop(1, `rgba(200,0,25,${eyeOpen*0.4})`);
          ctx.fillStyle = tg;
          ctx.shadowColor = '#FF2030'; ctx.shadowBlur = 10;
          ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255,130,110,${eyeOpen*0.9})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(0,0,IRIS_R*0.26,0,6.28);
        ctx.strokeStyle = `rgba(255,90,70,${eyeOpen*0.9})`;
        ctx.lineWidth = 2.0;
        ctx.shadowColor = '#FF1040'; ctx.shadowBlur = 10;
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.restore();

        // ── VERTICAL DEMON SLIT PUPIL ───────────────────
        const psw = IRIS_R * (pct < 75 ? 0.12 : 0.12 - (pct-75)/25*0.07);
        const psh = IRIS_R * (pct < 80 ? 0.50 : 0.50 + (pct-80)/20*0.14);
        const pdx = mx * IRIS_R * 0.10;
        const pdy = my * IRIS_R * 0.06;

        ctx.beginPath(); ctx.ellipse(pdx,pdy,psw,psh,0,0,6.28);
        ctx.fillStyle = '#000000'; ctx.fill();

        ctx.beginPath(); ctx.ellipse(pdx,pdy,psw*0.35,psh*0.7,0,0,6.28);
        ctx.fillStyle = `rgba(255,0,30,${eyeOpen*0.5})`;
        ctx.shadowColor = '#FF0020'; ctx.shadowBlur = 6;
        ctx.fill(); ctx.shadowBlur = 0;

        ctx.beginPath(); ctx.ellipse(pdx,pdy,psw,psh,0,0,6.28);
        ctx.strokeStyle = `rgba(255,40,50,${eyeOpen*0.85})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FF0030'; ctx.shadowBlur = 8;
        ctx.stroke(); ctx.shadowBlur = 0;

        // ── SPECULAR GLASS HIGHLIGHTS ───────────────────
        ctx.save();
        ctx.translate(-IRIS_R*0.25, -IRIS_R*0.28);
        ctx.rotate(-0.5);
        const sg1 = ctx.createRadialGradient(0,0,0,0,0,IRIS_R*0.38);
        sg1.addColorStop(0, `rgba(255,255,255,${eyeOpen*0.65})`);
        sg1.addColorStop(0.4,`rgba(255,220,220,${eyeOpen*0.28})`);
        sg1.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.ellipse(0,0,IRIS_R*0.38,IRIS_R*0.18,0,0,6.28);
        ctx.fillStyle = sg1; ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(IRIS_R*0.30, IRIS_R*0.26);
        const sg2 = ctx.createRadialGradient(0,0,0,0,0,IRIS_R*0.14);
        sg2.addColorStop(0, `rgba(255,200,200,${eyeOpen*0.38})`);
        sg2.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath(); ctx.ellipse(0,0,IRIS_R*0.14,IRIS_R*0.07,0,0,6.28);
        ctx.fillStyle = sg2; ctx.fill();
        ctx.restore();

        ctx.restore(); // iris translate
      }

      ctx.restore(); // eye clip

      // ── EYELIDS (Matches Theme Background) ─────────────
      const lidGap = eyeOpen;
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

      // Top Eyelid
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - EW/2, 0);
      ctx.lineTo(cx + EW/2, 0);
      ctx.lineTo(cx + EW/2, cy);
      ctx.bezierCurveTo(
        cx + EW*0.28, cy - EH * lidGap,
        cx - EW*0.28, cy - EH * lidGap,
        cx - EW/2, cy
      );
      ctx.lineTo(cx - EW/2, 0);
      ctx.closePath();
      ctx.fillStyle = bgColor;
      ctx.fill();

      // Top Lid Glowing Edge Line (Crimson Red)
      ctx.beginPath();
      ctx.moveTo(cx - EW/2, cy);
      ctx.bezierCurveTo(
        cx - EW*0.28, cy - EH * lidGap,
        cx + EW*0.28, cy - EH * lidGap,
        cx + EW/2, cy
      );
      ctx.strokeStyle = `rgba(255,20,40,${eyeOpen*0.9})`;
      ctx.lineWidth = 3.0;
      ctx.shadowColor = '#FF0030'; ctx.shadowBlur = 14;
      ctx.stroke(); ctx.shadowBlur = 0;
      ctx.restore();

      // Bottom Eyelid
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - EW/2, H);
      ctx.lineTo(cx + EW/2, H);
      ctx.lineTo(cx + EW/2, cy);
      ctx.bezierCurveTo(
        cx + EW*0.28, cy + EH * lidGap,
        cx - EW*0.28, cy + EH * lidGap,
        cx - EW/2, cy
      );
      ctx.lineTo(cx - EW/2, H);
      ctx.closePath();
      ctx.fillStyle = bgColor;
      ctx.fill();

      // Bottom Lid Glowing Edge Line (Crimson Red)
      ctx.beginPath();
      ctx.moveTo(cx - EW/2, cy);
      ctx.bezierCurveTo(
        cx - EW*0.28, cy + EH * lidGap,
        cx + EW*0.28, cy + EH * lidGap,
        cx + EW/2, cy
      );
      ctx.strokeStyle = `rgba(255,20,40,${eyeOpen*0.8})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#FF0030'; ctx.shadowBlur = 12;
      ctx.stroke(); ctx.shadowBlur = 0;
      ctx.restore();

      requestAnimationFrame(drawEye);
    };

    // ── Main Progress Loop ────────────────────────────────
    const t0 = performance.now();
    let lastQ = 0;

    const typer = setInterval(() => {
      if (typingIdx < MSGS[msgIdx].length) typingIdx++;
    }, 40);

    function tick(now: number) {
      const dt = now - lastNow;
      const t    = Math.min((now - t0) / 5200, 1);
      const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
      pct = ease * 100;

      targetOpen = isClosing
        ? Math.max(0, 1 - closingProg)
        : (pct < 10 ? 0 : pct < 55 ? (pct-10)/45 : 1);

      const spin = pct < 20 ? 0 : Math.min((pct-20)/55, 1);
      irisAngle1 += dt * spin * 0.00050;
      irisAngle2 -= dt * spin * 0.00032;

      const q = Math.floor(pct/20);
      if (q > lastQ && q <= 5) { lastQ=q; sound.playClick(170+q*65, 0.038); }

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        pct = 100; sound.playPop();
        setTimeout(() => {
          isClosing = true;
          const cT0 = performance.now();
          const cs = (n: number) => {
            closingProg = Math.min((n-cT0)/850, 1);
            if (closingProg < 1) requestAnimationFrame(cs);
          };
          requestAnimationFrame(cs);
          setTimeout(() => {
            loaded = true;
            setTimeout(() => {
              hidden = true;
              document.body.classList.remove('loading');
              document.documentElement.classList.remove('preloader-active');
            }, 1050);
          }, 350);
        }, 650);
      }
    }

    requestAnimationFrame(drawEye);
    requestAnimationFrame(tick);

    return () => {
      clearInterval(typer);
      window.removeEventListener('resize', setSize);
      document.body.classList.remove('loading');
      document.documentElement.classList.remove('preloader-active');
    };
  });
</script>

{#if !hidden}
<div class="preloader" class:loaded bind:this={containerEl} aria-hidden="true">

  <!-- Eye rendering canvas -->
  <canvas class="eye-cvs" bind:this={eyeCanvas}></canvas>

  <!-- Blueprint Grid Pattern -->
  <div class="blueprint-overlay"></div>

  <!-- Film grain -->
  <div class="grain"></div>

  <!-- HUD: PROGRESS LINE ────────────────────────────────────────── -->
  <div class="hud-line-container">
    <div class="hud-top-row">
      <span class="msg">{displayMsg}<span class="cur">_</span></span>
      <span class="pct-text">{Math.floor(pct)}%</span>
    </div>

    <!-- Thin Minimal Progress Line -->
    <div class="progress-line-track">
      <div class="progress-line-fill" style="width: {pct}%"></div>
      <div class="progress-line-glow" style="left: {pct}%"></div>
    </div>
  </div>

</div>
{/if}


<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

  :global(body.loading) { overflow: hidden !important; }

  /* ════════════════════════════════════════════════════════
     PRELOADER ROOT — CINEMATIC DEEP DARK BACKGROUND
     ════════════════════════════════════════════════════════ */
  .preloader {
    position: fixed; inset: 0; z-index: 99999;
    background: #060606;
    color: #ffffff;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    overflow: hidden;
    will-change: opacity, transform;
    transition: opacity 1s cubic-bezier(0.76, 0, 0.24, 1), transform 1s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .preloader.loaded { opacity: 0; transform: scale(1.02); pointer-events: none; }



  /* Eye canvas */
  .eye-cvs {
    position: absolute; inset: 0;
    width: 100% !important; height: 100% !important;
    pointer-events: none; z-index: 2;
  }

  /* Blueprint Grid Pattern */
  .blueprint-overlay {
    position: absolute; inset: 0; z-index: 3; pointer-events: none;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.7;
  }

  /* Film grain overlay */
  .grain {
    position: absolute; inset: 0; z-index: 4;
    pointer-events: none; opacity: 0.05; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    animation: grain-a 0.22s steps(1) infinite;
  }
  @keyframes grain-a {
    0%  { background-position: 0 0; }
    17% { background-position: -14px 8px; }
    34% { background-position: 9px -13px; }
    50% { background-position: -8px -8px; }
    67% { background-position: 13px 6px; }
    84% { background-position: -6px 12px; }
  }

  /* ════════════════════════════════════════════════════════
     HUD — PROGRESS LINE (GARIS SAJA)
     ════════════════════════════════════════════════════════ */
  .hud-line-container {
    position: relative; z-index: 20;
    width: 100%; max-width: 520px;
    padding: 0 24px;
    padding-bottom: clamp(44px, 8vh, 90px);
    display: flex; flex-direction: column; gap: 12px;
  }

  .hud-top-row {
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--font-mono), 'Orbitron', monospace;
    font-size: clamp(0.72rem, 1.5vw, 0.88rem);
    font-weight: 700;
  }

  .msg {
    letter-spacing: 0.14em;
    color: #ffffff !important;
    opacity: 1 !important;
    text-transform: uppercase;
  }
  .cur {
    display: inline-block; color: #ff3344; margin-left: 1px;
    animation: cur-blink 0.85s step-end infinite;
  }
  @keyframes cur-blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }

  .pct-text {
    font-size: clamp(0.85rem, 1.8vw, 1.05rem);
    color: #ffffff !important;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
  }

  /* Thin Progress Line */
  .progress-line-track {
    position: relative; width: 100%; height: 3px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 99px;
    overflow: visible;
  }

  .progress-line-fill {
    position: absolute; top: 0; left: 0; height: 100%;
    background: linear-gradient(90deg, rgba(var(--ink-rgb), 0.4), #FF0030);
    border-radius: 99px;
    transition: width 0.12s linear;
    box-shadow: 0 0 10px rgba(255,0,48,0.8);
  }

  .progress-line-glow {
    position: absolute; top: 50%;
    width: 12px; height: 12px;
    background: #FF0030;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 16px 4px rgba(255,0,48,0.9), 0 0 4px #FFFFFF;
    transition: left 0.12s linear;
  }

  @media (prefers-reduced-motion: reduce) {
    .preloader { transition: opacity 0.3s linear !important; }
    .grain { animation: none !important; }
  }
</style>
