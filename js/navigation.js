function normalizePath(path) {
  return path.replace(/\/+$/, "").toLowerCase();
}

function setActiveNavigation() {
  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll(".top-nav a");

  navLinks.forEach(function (link) {
    const linkPath = normalizePath(
      new URL(link.href, window.location.origin).pathname
    );

    if (currentPath === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setActiveNavigation();
});

document.addEventListener("hudsonlab:headerLoaded", function () {
  setActiveNavigation();
});