function normalizePath(path) {
  if (!path) {
    return "/";
  }

  const normalized = path.replace(/\/+$/, "").toLowerCase();
  return normalized === "" ? "/" : normalized;
}

function setActiveNavigation() {
  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll(".top-nav a");

  navLinks.forEach(function (link) {
    let linkPath = "/";

    try {
      linkPath = normalizePath(
        new URL(link.href, window.location.origin).pathname
      );
    } catch (error) {
      console.error("Invalid navigation link:", link, error);
    }

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