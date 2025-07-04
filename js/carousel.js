document.addEventListener("DOMContentLoaded", () => {
  // Select all carousel tracks
  const tracks = document.querySelectorAll(".carousel-track");

  tracks.forEach((track) => {
    let scrollAmount = 0;

    setInterval(() => {
      const cardWidth = track.querySelector(".service-card").offsetWidth + 20;
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      } else {
        scrollAmount += cardWidth;
      }

      track.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 3000);
  });
});
