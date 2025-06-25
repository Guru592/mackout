// Grab the carousel track container
const track = document.getElementById("brandCarousel");
let scrollSpeed = 1; // Change to 2 or more if you want it faster

// Duplicate the logos to simulate infinite scrolling
function cloneLogos() {
  const logos = Array.from(track.children);
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
}

cloneLogos();

// Animate the track by changing its transform X value
let position = 0;

function scrollLogos() {
  position -= scrollSpeed;
  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0; // Reset the scroll to create a loop
  }
  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(scrollLogos);
}

scrollLogos();
