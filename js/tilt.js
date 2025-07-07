// === Scroll-triggered animation ===
const faders = document.querySelectorAll('.fade-in-on-scroll');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.3 });

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// === VanillaTilt setup ===
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 10,
  speed: 600,
  glare: true,
  "max-glare": 0.15
});
