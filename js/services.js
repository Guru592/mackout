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

  const stay = 3.5;   // hold time per panel
  const slide = 1.2;  // slide duration

  tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

  panels.forEach((_, i) => {
    tl.to({}, { duration: stay }); // hold
    if (i < panels.length - 1) {
      const x = -(i + 1) * window.innerWidth;
      tl.to(container, {
        x,
        duration: slide,
        onStart: () => { currentIndex = i + 1; }
      });
    }
  });

  // ✅ Last panel: hold, then jump instantly back to first
  tl.to({}, { duration: stay });
  tl.set(container, { x: 0, onStart: () => { currentIndex = 0; } });
}


  buildTimeline();

  // Manual arrows
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      tl.pause(); // stop autoplay
      goToPanel(currentIndex + 1);
      restartAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      tl.pause();
      goToPanel(currentIndex - 1);
      restartAutoplay();
    });
  }

  // Restart autoplay after inactivity
  let restartTimer;
  function restartAutoplay() {
    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => tl.restart(), 6000); // resume after 6s idle
  }

  // Rebuild on resize
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(buildTimeline, 200);
  });

  // Pause on hover
  //container.addEventListener('mouseenter', () => tl && tl.pause());
 // container.addEventListener('mouseleave', () => tl && tl.resume());

  // Accordion logic remains unchanged...
});
