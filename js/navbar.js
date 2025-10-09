document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const blurBackground = document.getElementById('blurBackground'); // ✅ FIX
  const menuLinks = document.querySelectorAll('.menu-links a'); // ✅ target <a>
  const panels = document.querySelectorAll('.panel');

  let isPaused = false;
  let timeout = null;

  const panelDurations = [6000, 5000, 8000];

  function showPanel(index) {
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.classList.add('active');
        panel.style.zIndex = 2;
      } else {
        panel.style.zIndex = 1;
        panel.classList.remove('active');
      }
    });
  }

  function playCinematic(index) {
    if (isPaused) return;
    showPanel(index);

    const nextIndex = (index + 1) % panels.length;
    timeout = setTimeout(() => {
      playCinematic(nextIndex);
    }, panelDurations[index]);
  }

  // Skip button
  document.querySelector('.skip-intro')?.addEventListener('click', () => {
    clearTimeout(timeout);
    panels.forEach(panel => panel.classList.remove('active'));
    panels[panels.length - 1].classList.add('active');
  });

  playCinematic(0);

  // ✅ Hamburger toggle
  menuToggle.addEventListener('click', () => {
    if (!menuOverlay.classList.contains('active')) {
      // Open
      menuOverlay.classList.add('active');
      blurBackground.classList.add('active');
      menuToggle.classList.add('active');
      isPaused = true;
      clearTimeout(timeout);
    } else {
      // Close
      menuToggle.classList.remove('active');
      setTimeout(() => {
        menuOverlay.classList.remove('active');
        blurBackground.classList.remove('active');
      }, 150);

      isPaused = false;
      const currentActiveIndex = [...panels].findIndex(panel =>
        panel.classList.contains('active')
      );
      playCinematic((currentActiveIndex + 1) % panels.length);
    }
  });

  // ✅ Allow links to close menu + actually navigate
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      blurBackground.classList.remove('active');
      menuToggle.classList.remove('active');
      isPaused = false;

      // ✅ allow real navigation
    window.location.href = link.href;

    });
  });
});
