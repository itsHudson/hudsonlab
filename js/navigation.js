function setActiveNavigation() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".top-nav a");

  navLinks.forEach(function (link) {
    const linkPath = new URL(link.href, window.location.origin).pathname.toLowerCase();

    if (currentPath === linkPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavigation();
});

document.addEventListener("hudsonlab:headerLoaded", function () {
  setActiveNavigation();
});