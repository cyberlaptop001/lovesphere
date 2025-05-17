// Smooth Scroll for Back to Top Button
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Show Back to Top Button on Scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
});
