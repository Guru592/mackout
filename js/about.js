// General Scroll Animation Script for Mackout Brands

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.2}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('[class*="animate-"]').forEach(el => {
  observer.observe(el);
});
