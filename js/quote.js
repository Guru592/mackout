document.addEventListener("DOMContentLoaded", function () {
  const quotes = [
    "We don’t decorate brands — we define them.",
    "Design is the silent ambassador of your brand.",
    "Creativity begins where certainty ends.",
    "Stories are strategy when told well.",
  ];

  let current = 0;
  const quoteEl = document.getElementById("rotating-quote");

  if (quoteEl) {
    setInterval(() => {
      current = (current + 1) % quotes.length;
      quoteEl.textContent = `"${quotes[current]}"`;
    }, 5000);
  }
});
