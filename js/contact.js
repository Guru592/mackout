document.addEventListener('DOMContentLoaded', () => {
  // Fallback if GSAP not available
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

  const panels = Array.from(container.querySelectorAll('.panel'));
  if (!panels.length) {
    console.error('No .panel elements found inside container.');
    return;
  }

  // Set widths in px (for accurate translation)
  function setWidths() {
    const vw = window.innerWidth;
    panels.forEach(p => (p.style.width = vw + 'px'));
    container.style.width = vw * panels.length + 'px';
  }

  let tl;

  function buildTimeline() {
    if (tl) tl.kill();
    setWidths();

    const slide = 1.2; // Slide duration
    const stayDurations = [3.5, 6.5, 3.5]; // Panel 2 stays longer

    tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power2.inOut' },
      onRepeat: () => {
        // Instantly reset container position to start (no reverse motion)
        gsap.set(container, { x: 0 });
      }
    });

    panels.forEach((panel, i) => {
      const content = panel.querySelector('.content');
      const stay = stayDurations[i] || 3.5;

      // Entrance
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }
        );
      }

      // Hold
      tl.to({}, { duration: stay });

      // Exit
      if (content) {
        if (i === 0) {
          tl.to(content, { opacity: 0, y: -60, duration: 0.6, ease: 'power2.in' });
        } else if (i === 1) {
          tl.to(content, { opacity: 0, x: -80, duration: 0.6, ease: 'power2.in' });
        } else {
          tl.to(content, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.in' });
        }
      }

      // Slide to next panel (if not last)
      if (i < panels.length - 1) {
        const x = -(i + 1) * window.innerWidth;
        tl.to(container, { x, duration: slide }, '<');
      }
    });

    // After last panel: short pause before instant reset
    tl.to({}, { duration: stayDurations[panels.length - 1] });
  }

  // Initialize
  buildTimeline();

  // Rebuild timeline on resize (debounced)
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(buildTimeline, 180);
  });
});
