// about.js — robust panel switching with safe hide/show behavior
// IMPORTANT: make sure your HTML contains: <div class="flash-overlay" aria-hidden="true"></div>

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------
  // Query elements
  // -------------------------
  const panels = Array.from(document.querySelectorAll('.panel')); // all panels
  const dots = Array.from(document.querySelectorAll('.dot'));     // progress dots
  const countdownEl = document.getElementById('countdown');       // 3..2..1 overlay
  const nextBtn = document.getElementById('nextBtn');             // optional next button
  const recTimerEl = document.getElementById('rec-timer');        // recorder timer
  const flashFx = document.querySelector('.flash-overlay');       // the new flash overlay element

  // -------------------------
  // State + constants
  // -------------------------
  let current = 0;        // index of the currently visible panel
  let auto = null;        // interval id for auto-advance
  let seconds = 0;        // recorder seconds counter
  // lifespans in milliseconds for each panel
const PANEL_LIFESPANS = [
  8000,  // panel 0
  10000, // panel 1
  12000, // panel 2
  12000   // panel 3
];


  // NOTE: This should match your CSS transition duration (in ms) + small buffer
  // If your CSS uses "transition: opacity 0.8s ..." keep this at ~850.
  const CSS_TRANSITION_MS = 1500;

  // -------------------------
  // Initialization: show only the starting panel
  // -------------------------
  panels.forEach((p, i) => {
    // show the current panel, hide others
    p.style.display = (i === current) ? 'flex' : 'none';
    // make sure the .active class matches the visible state (CSS animations rely on it)
    p.classList.toggle('active', i === current);
    // set z-index so visible panel sits above hidden ones
    p.style.zIndex = (i === current) ? '2' : '0';

    // safety: ensure panels center content if CSS missing
    p.style.alignItems = 'center';
    p.style.justifyContent = 'center';
  });
  updateDots(current); // reflect the active dot in UI

  // -------------------------
  // Helper: trigger a quick flash animation
  // -------------------------
  function triggerFlash() {
    // if overlay is missing (e.g. removed during development), do nothing
    if (!flashFx) return;

    // restart the CSS animation: remove class, force reflow, re-add class
    flashFx.classList.remove('active');
    void flashFx.offsetWidth; // force reflow
    flashFx.classList.add('active');
  }

  // -------------------------
  // Helper: update progress dots & aria attributes
  // -------------------------
  function updateDots(i) {
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === i);
      d.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
  }

  // -------------------------
  // Core: switch panels with safe hide/show
  // -------------------------
  function showPanel(index) {
    // if already on the requested panel, do nothing
    if (index === current) return;

    // wrap bounds
    const total = panels.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    const outgoing = panels[current];   // currently visible panel
    const incoming = panels[index];     // panel we are moving to

    // Make incoming visible on the layout (display:flex), so its transition can run
    incoming.style.display = 'flex';

    // Force reflow so the browser registers display change before we add .active
    // (this ensures the CSS transition for opacity/transform will run)
    void incoming.offsetWidth;

    // Put incoming on top while it animates in
    incoming.style.zIndex = '3';
    incoming.classList.add('active'); // CSS transitions handle opacity/transform

    // Start fading outgoing out by removing its .active class
    outgoing.classList.remove('active');
    outgoing.style.zIndex = '2';

    // After the CSS transition finishes, fully hide the outgoing element
    setTimeout(() => {
      outgoing.style.display = 'none'; // remove from layout / block pointer-events
      outgoing.style.zIndex = '0';
      incoming.style.zIndex = '2';     // normalize incoming z-index
      current = index;                 // update state
      updateDots(current);             // update dots
    }, CSS_TRANSITION_MS);
  }

  // -------------------------
  // Public API: go to index (wraps showPanel + triggers flash)
  // -------------------------
  function goTo(index) {
    // Step 1: start the panel swap (fade out old, fade in new)
    showPanel(index);

    
  }

  // -------------------------
  // Auto-advance controls
  // -------------------------
 function startAuto() {
  stopAuto();
  auto = setTimeout(() => {
    goTo(current + 1);
    startAuto(); // restart with next panel's lifespan
  }, PANEL_LIFESPANS[current]);
}

function stopAuto() {
  if (auto) clearTimeout(auto);
  auto = null;
}


  // -------------------------
  // Recorder timer (shows elapsed time in rec-timer)
  // -------------------------
  let recInterval = null;
  function startRecTimer() {
    if (!recTimerEl) return;    // nothing to update
    if (recInterval) return;    // already running (guard)
    recInterval = setInterval(() => {
      seconds += 1;
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      recTimerEl.textContent = `${m}:${s}`;
    }, 1000);
  }

  // -------------------------
  // Countdown (3..2..1) before starting auto-cycle
  // -------------------------
  function startCountdown() {
    if (!countdownEl) return;
    let n = 3;
    countdownEl.textContent = n;
    const t = setInterval(() => {
      n -= 1;
      if (n > 0) {
        countdownEl.textContent = n;
      } else {
        clearInterval(t);
        countdownEl.classList.add('hidden'); // hide the big countdown overlay
        // Start the show:
        goTo(0);       // ensure the first panel is visible
        startRecTimer();
        startAuto();
      }
    }, 1000);
  }

  // -------------------------
  // Events: next button and dots
  // -------------------------
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();   // pause auto-advance while user navigates manually
      goTo(i);      // show clicked panel
      startAuto();  // resume auto-advance
    });
  });

  // Expose for debugging (open console -> window._aboutPanels)
  window._aboutPanels = { panels, dots };

  // Start the countdown when page is ready
  startCountdown();
});
