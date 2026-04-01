function getBasePath() {
  const path = window.location.pathname.toLowerCase();

  if (
    path.includes("/journey/ac-cake-house/") ||
    path.includes("/journey/asia-pacific-university/") ||
    path.includes("/journey/ucsi-university/") ||
    path.includes("/journey/webhelp-malaysia/")
  ) {
    return "../../";
  }

  if (
    path.includes("/about/") ||
    path.includes("/techexplorer/") ||
    path.includes("/education/") ||
    path.includes("/certifications/") ||
    path.includes("/contact/") ||
    path.includes("/journey/")
  ) {
    return "../";
  }

  return "./";
}

function applyBasePathToLinks(container, basePath) {
  if (!container) {
    return;
  }

  const pathLinks = container.querySelectorAll("[data-path]");

  pathLinks.forEach(function (link) {
    const targetPath = link.getAttribute("data-path");

    if (!targetPath) {
      return;
    }

    link.setAttribute("href", basePath + targetPath);
  });
}

function loadComponent(id, filePath, callback) {
  const target = document.getElementById(id);

  if (!target) {
    if (typeof callback === "function") {
      callback();
    }
    return;
  }

  fetch(filePath)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load " + filePath);
      }

      return response.text();
    })
    .then(function (data) {
      target.innerHTML = data;

      const basePath = getBasePath();
      applyBasePathToLinks(target, basePath);

      if (typeof callback === "function") {
        callback();
      }
    })
    .catch(function (error) {
      console.error(error);

      if (typeof callback === "function") {
        callback();
      }
    });
}

function initMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("mobileNavigation");

  if (!toggle || !panel) {
    return;
  }

  toggle.addEventListener("click", function () {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", function (event) {
    if (!panel.classList.contains("is-open")) {
      return;
    }

    if (panel.contains(event.target) || toggle.contains(event.target)) {
      return;
    }

    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const basePath = getBasePath();

  loadComponent("header", basePath + "Components/header.html", function () {
    document.dispatchEvent(new CustomEvent("hudsonlab:headerLoaded"));
    initMobileNavigation();
  });

  loadComponent("footer", basePath + "Components/footer.html");
});