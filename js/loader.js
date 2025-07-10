window.addEventListener("load", () => {
  const hero = document.getElementById("hero");
  const loader = document.getElementById("loader");

  const elements = [
    document.getElementById("heroHeading"),
    document.getElementById("heroTagline"),
    document.getElementById("heroText"),
    document.getElementById("heroButton")
  ];

  if (!hero || !loader || elements.some(el => !el)) {
    console.error("Missing one or more hero elements");
    return;
  }

  const bgImage = new Image();
  bgImage.src = "images/hero1.webp";

  bgImage.onload = function () {
    hero.style.backgroundImage = `
      linear-gradient(rgba(44, 42, 74, 0.7), rgba(44, 42, 74, 0.7)),
      url('${bgImage.src}')
    `;
    hero.classList.add("show");

    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 200);
    });

    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 800);
  };

  bgImage.onerror = function () {
    console.error("Failed to load background.");
    hero.classList.add("show");
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 200);
    });

    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 800);
  };
});
