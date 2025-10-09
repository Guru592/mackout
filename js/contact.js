document.addEventListener('DOMContentLoaded', () => {
  // Fallback if GSAP not available: reveal content and bail out
  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded — showing content without animations.');
    document.querySelectorAll('.content').forEach(c => {
      c.style.opacity = 1;
      c.style.transform = 'none';
    });
    return;
  }

  console.log('Contact autoplay started — GSAP OK');

  const container = document.querySelector('#contactContainer');
  if (!container) {
    console.error('No #contactContainer found.');
    return;
  }

  // scope panels to only those inside the container
  const panels = Array.from(container.querySelectorAll('.panel'));
  if (!panels.length) {
    console.error('No .panel elements found inside container.');
    return;
  }

  // set widths in px (so GSAP moves exact pixels) and container width
  function setWidths() {
    const vw = window.innerWidth;
    panels.forEach(p => p.style.width = vw + 'px');
    container.style.width = (vw * panels.length) + 'px';
  }

  let tl;
  function buildTimeline() {
    if (tl) tl.kill();

    setWidths();

    const stay = 3.5;   // time each panel stays visible
    const slide = 1.2;  // slide duration

    tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    panels.forEach((panel, i) => {
      const content = panel.querySelector('.content');

      // safety: ensure content visible in case of missing element
      if (!content) {
        tl.to({}, { duration: stay }); // just hold
        if (i < panels.length - 1) {
          const x = -(i + 1) * window.innerWidth;
          tl.to(container, { x: x, duration: slide }, '>');
        }
        return;
      }

      // Entrance animation for this panel's content
      tl.fromTo(content,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }
      );

      // Hold visible
      tl.to({}, { duration: stay });

      // Exit animation (unique per panel)
      if (i === 0) {
        tl.to(content, { opacity: 0, y: -60, duration: 0.6, ease: 'power2.in' });
      } else if (i === 1) {
        tl.to(content, { opacity: 0, x: -80, duration: 0.6, ease: 'power2.in' });
      } else {
        tl.to(content, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.in' });
      }

      // Slide container to next panel (start slide concurrent with exit)
      if (i < panels.length - 1) {
        const x = -(i + 1) * window.innerWidth;
        // start slide at the same point as the previous exit tween ends (using relative placement)
        tl.to(container, { x: x, duration: slide }, "<");
      }
    });

    // Final hold on last panel then slide back to start
    tl.to({}, { duration: stay });
    tl.to(container, { x: 0, duration: slide });
  }

  // build initially
  buildTimeline();

  // rebuild timeline on resize with debounce
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(buildTimeline, 180);
  });

  
});
