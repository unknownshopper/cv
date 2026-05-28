
(function () {
  const root = document.documentElement;
  const page = document.getElementById('cv');
  if (!page) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function schedule() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onMove(e) {
    const r = page.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    targetX = (x - 0.5) * 18;
    targetY = (y - 0.5) * 18;
    schedule();
  }

  function tick() {
    raf = 0;
    currentX += (targetX - currentX) * 0.085;
    currentY += (targetY - currentY) * 0.085;

    root.style.setProperty('--px', currentX.toFixed(2) + 'px');
    root.style.setProperty('--py', currentY.toFixed(2) + 'px');

    if (Math.abs(targetX - currentX) > 0.04 || Math.abs(targetY - currentY) > 0.04) {
      raf = requestAnimationFrame(tick);
    }
  }

  page.addEventListener('pointermove', onMove, { passive: true });
  page.addEventListener(
    'pointerleave',
    () => {
      targetX = 0;
      targetY = 0;
      schedule();
    },
    { passive: true },
  );
})();

