/* ───────────────────────────────
   MACKOUT BRANDS – SERVICES PAGE
   Cinematic Multi-Panel Experience (Footer-safe)
──────────────────────────────────*/

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded!');
    return;
  }

  const container = document.querySelector('.services-container');
  // ✅ Only target panels that are NOT the footer
  const panels = Array.from(container.querySelectorAll(':scope > .panel:not(#footer-placeholder)'));
  const nextBtn = document.getElementById('nextPanel');
  const prevBtn = document.getElementById('prevPanel');

  let currentIndex = 0;
  let tl;
  let restartTimer;

  // ───────────────────────────────
  // 🔹 PANEL WIDTH SETUP
  // ───────────────────────────────
  function setWidths() {
    const vw = window.innerWidth;
    panels.forEach(p => p.style.width = vw + 'px');
    container.style.width = (vw * panels.length) + 'px';
  }

  // ───────────────────────────────
  // 🔹 MANUAL PANEL NAVIGATION
  // ───────────────────────────────
  function goToPanel(index, duration = 1.2) {
    if (index < 0) index = panels.length - 1;
    if (index >= panels.length) index = 0;
    currentIndex = index;
    const x = -(index * window.innerWidth);
    gsap.to(container, { x, duration, ease: "power2.inOut" });
  }

  // ───────────────────────────────
  // 🔹 AUTOPLAY TIMELINE
  // ───────────────────────────────
  function buildTimeline() {
    if (tl) tl.kill();

    setWidths();

    const stay = 3.5;   // hold time per panel
    const slide = 1.2;  // slide duration

    tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    panels.forEach((_, i) => {
      tl.to({}, { duration: stay }); // hold each panel
      if (i < panels.length - 1) {
        const x = -(i + 1) * window.innerWidth;
        tl.to(container, {
          x,
          duration: slide,
          onStart: () => { currentIndex = i + 1; }
        });
      }
    });

    // Last panel → pause then jump back
    tl.to({}, { duration: stay });
    tl.set(container, { x: 0, onStart: () => { currentIndex = 0; } });
  }

  buildTimeline();

  // ───────────────────────────────
  // 🔹 ARROW CONTROLS
  // ───────────────────────────────
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      tl.pause();
      goToPanel(currentIndex + 1);
      restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      tl.pause();
      goToPanel(currentIndex - 1);
      restartAutoplay();
    });
  }

  // ───────────────────────────────
  // 🔹 AUTOPLAY RESTART
  // ───────────────────────────────
  function restartAutoplay() {
    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => tl.restart(), 6000);
  }

  // ───────────────────────────────
  // 🔹 RESIZE HANDLER
  // ───────────────────────────────
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(buildTimeline, 200);
  });

  // ───────────────────────────────
  // 🔹 ACCORDION LOGIC
  // ───────────────────────────────
  const serviceHeaders = document.querySelectorAll('.service-header');

  serviceHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const service = header.closest('.service');
      const isOpen = service.classList.contains('open');

      // Pause GSAP while user interacts
      if (tl && tl.isActive()) tl.pause();

      // Close all accordions first
      document.querySelectorAll('.service').forEach(s => s.classList.remove('open'));

      // Toggle clicked one
      if (!isOpen) service.classList.add('open');

      // Restart autoplay after 6 seconds of inactivity
      clearTimeout(restartTimer);
      restartTimer = setTimeout(() => {
        if (tl && !tl.isActive()) tl.resume();
      }, 6000);
    });
  });

});
