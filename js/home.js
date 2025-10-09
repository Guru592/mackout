// ===============================
// Homepage Cinematic Panels + Arrows
// ===============================

// Grab DOM elements
const panels = document.querySelectorAll(".panel");
const skipBtn = document.querySelector(".skip-intro");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let currentIndex = 0;
let autoplay = true;
let autoplayTimeout;

// Panel durations (seconds → convert to ms)
const panelDurations = [9000, 9000, 9000, 8000]; // Discover, Define, Amplify, Footer

// Reset: stack panels and hide
gsap.set(panels, {
  autoAlpha: 0,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
});

// Show first panel
gsap.set(panels[0], { autoAlpha: 1 });
animateTextIn(panels[0]);

// ===============================
// Functions
// ===============================
function showPanel(index) {
  if (index === currentIndex) return;

  const current = panels[currentIndex];
  const next = panels[index];

  // Fade out current
  gsap.to(current.querySelectorAll("h1, p, .cta-btn"), {
    autoAlpha: 0,
    y: -20,
    duration: 0.6,
    stagger: 0.1
  });
  gsap.to(current, { autoAlpha: 0, duration: 1 });

  // Fade in next
  gsap.to(next, { autoAlpha: 1, duration: 1 });
  animateTextIn(next);

  currentIndex = index;
}

function animateTextIn(panel) {
  gsap.fromTo(
    panel.querySelectorAll("h1, p, .cta-btn"),
    { autoAlpha: 0, y: 20 },
    { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" }
  );
}

function nextPanel() {
  let nextIndex = (currentIndex + 1) % panels.length;
  showPanel(nextIndex);
}

function prevPanel() {
  let prevIndex = (currentIndex - 1 + panels.length) % panels.length;
  showPanel(prevIndex);
}

function startAutoplay() {
  clearTimeout(autoplayTimeout);
  if (!autoplay) return;
  autoplayTimeout = setTimeout(() => {
    nextPanel();
    startAutoplay();
  }, panelDurations[currentIndex]);
}

// ===============================
// Arrow Controls
// ===============================
rightArrow?.addEventListener("click", () => {
  autoplay = false; // stop autoplay when user interacts
  nextPanel();
});

leftArrow?.addEventListener("click", () => {
  autoplay = false;
  prevPanel();
});

// ===============================
// Skip Button → jump to footer
// ===============================
skipBtn?.addEventListener("click", () => {
  autoplay = false;
  showPanel(panels.length - 1);
});

// ===============================
// Start autoplay
// ===============================
startAutoplay();
