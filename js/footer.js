document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;

      // Add the footer CSS dynamically
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/footer.css";
      document.head.appendChild(link);
    })
    .catch(err => console.error("Footer load failed:", err));
});
