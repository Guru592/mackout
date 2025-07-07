document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-inner");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const delay = parseInt(entry.target.dataset.delay) || 0;

      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("flip-in");
        }, delay);
      } else {
        // Remove flip-in when out of view to reverse it
        entry.target.classList.remove("flip-in");
      }
    });
  }, {
    threshold: 0.5,
  });

  cards.forEach((card, index) => {
    card.dataset.delay = index * 300; // 300ms delay between cards
    observer.observe(card);
  });
});
