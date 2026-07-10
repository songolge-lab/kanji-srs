// Lightweight, dependency-free canvas confetti burst. Self-contained: spawns a
// fixed full-screen canvas, animates particles under gravity with a single RAF
// loop, then removes the canvas + detaches listeners once particles fade/settle.
// Safe to call repeatedly (each call = one independent burst). GPU-friendly:
// only a 2D canvas is animated; no per-frame DOM/style thrash on the page.

const COLORS = ['#e5484d', '#2c5d80', '#2f6b4f', '#c99a3a', '#b5495f', '#e8c15a', '#5b8bd0'];

export function fireConfetti(opts = {}) {
  if (typeof document === 'undefined' || !document.body) return;
  // Respect the OS "reduce motion" preference — no burst for those users.
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  } catch { /* matchMedia unavailable — proceed */ }

  const count = opts.count || 150;
  const durationMs = opts.duration || 2600;

  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.floor(window.innerWidth * dpr);
    H = canvas.height = Math.floor(window.innerHeight * dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  const originX = W / 2;
  const originY = H * 0.30;
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Fan the initial velocity mostly upward/outward for a "pop" feel.
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * Math.PI * 0.95;
    const speed = (5 + Math.random() * 9) * dpr;
    particles.push({
      x: originX + (Math.random() - 0.5) * 140 * dpr,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3 * dpr,
      size: (5 + Math.random() * 6) * dpr,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.32,
      shape: Math.random() < 0.55 ? 'rect' : 'circle',
    });
  }

  const gravity = 0.28 * dpr;
  const drag = 0.992;
  const start = performance.now();
  let raf = 0;

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    // Fade everything out over the final 700ms.
    const fade = elapsed > durationMs - 700
      ? Math.max(0, (durationMs - elapsed) / 700)
      : 1;
    for (const p of particles) {
      p.vy += gravity;
      p.vx *= drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      if (p.y < H + 60 * dpr && fade > 0) alive++;
      ctx.globalAlpha = fade;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (alive > 0 && elapsed < durationMs) {
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.remove();
    }
  }
  raf = requestAnimationFrame(frame);
}
