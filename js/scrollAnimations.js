// scrollAnimations.js
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(fader => observer.observe(fader));
});
