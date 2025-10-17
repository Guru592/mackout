document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded!');
    return;
  }

  const container = document.querySelector('.services-container');
  const panels = Array.from(container.querySelectorAll(':scope > .panel'));
  const nextBtn = document.getElementById('nextPanel');
  const prevBtn = document.getElementById('prevPanel');

  let currentIndex = 0;
  let tl;

  function setWidths() {
    const vw = window.innerWidth;
    panels.forEach(p => p.style.width = vw + 'px');
    container.style.width = (vw * panels.length) + 'px';
  }

  function goToPanel(index, duration = 1) {
    if (index < 0) index = panels.length - 1;
    if (index >= panels.length) index = 0;
    currentIndex = index;
    const x = -(index * window.innerWidth);
    gsap.to(container, { x, duration, ease: "power2.inOut" });
  }

  function buildTimeline() {
    if (tl) tl.kill();
    setWidths();

    const stay = 3.5;
    const slide = 1.2;
    const overlay = document.querySelector('.fade-overlay') || (() => {
      const el = document.createElement("div");
      el.classList.add("fade-overlay");
      document.body.appendChild(el);
      return el;
    })();

    tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    // Go through each panel except the last one normally
    panels.forEach((panel, i) => {
      tl.to({}, { duration: stay });
      if (i < panels.length - 1) {
        const x = -(i + 1) * window.innerWidth;
        tl.to(container, {
          x,
          duration: slide,
          onStart: () => { currentIndex = i + 1; }
        });
      }
    });

    // ✅ At footer (last panel)
    tl.to({}, { duration: stay }); // hold footer
    tl.to(overlay, { opacity: 1, duration: 1.2, ease: "power2.inOut" }); // fade to black

    // Instantly reset position to first panel behind the black overlay
    tl.set(container, { x: 0, onStart: () => { currentIndex = 0; } });

    // Fade back in to reveal the first panel
    tl.to(overlay, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
  }

  buildTimeline();

  // Manual controls
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

  // Restart autoplay after manual use
  let restartTimer;
  function restartAutoplay() {
    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => tl.restart(), 6000);
  }

  // Recalculate on resize
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(buildTimeline, 200);
  });
});
