particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#3f3b56" }, // new, more visible color
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 2 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#3f3b56", // updated to match particles
      opacity: 0.25,
      width: 1.2
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});
