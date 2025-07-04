document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track-1");
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
