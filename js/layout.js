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

document.addEventListener("DOMContentLoaded", function () {
  const basePath = getBasePath();

  loadComponent("header", basePath + "Components/header.html", function () {
    document.dispatchEvent(new CustomEvent("hudsonlab:headerLoaded"));
  });

  loadComponent("footer", basePath + "Components/footer.html");
});