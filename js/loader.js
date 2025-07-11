window.addEventListener("load", () => {
  const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
  if (!isHome) return;

  const hero = document.getElementById("hero");
  const loader = document.getElementById("loader");

  if (!hero || !loader) {
    console.error("❌ Missing hero or loader element.");
    return;
  }

  const bgImage = new Image();
  bgImage.src = "images/hero1.webp";

  bgImage.onload = function () {
    hero.style.backgroundImage =
      "linear-gradient(rgba(44, 42, 74, 0.7), rgba(44, 42, 74, 0.7)), url('" + bgImage.src + "')";
    hero.classList.add("show");

    document.body.classList.add("loaded"); // ✅ Trigger CSS animation

    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 800);
  };

  bgImage.onerror = function () {
    console.error("❌ Failed to load hero background.");
    hero.classList.add("show");

    document.body.classList.add("loaded"); // ✅ Trigger even if fallback

    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 800);
  };
});
