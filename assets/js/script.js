const menuToggleButton = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const currentYearElement = document.getElementById("year");

if (menuToggleButton && navMenu) {
  menuToggleButton.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("show");
    });
  });
}

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}