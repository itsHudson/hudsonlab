function getBasePath() {
  const path = window.location.pathname.toLowerCase();

  if (
    path.includes("/journey/retail-foundation/") ||
    path.includes("/journey/business-education/") ||
    path.includes("/journey/operations-leadership/") ||
    path.includes("/journey/global-support/") ||
    path.includes("/journey/technology-transition/")
  ) {
    return "../../";
  }

  if (
    path.includes("/about/") ||
    path.includes("/techexplorer/") ||
    path.includes("/experience/") ||
    path.includes("/education/") ||
    path.includes("/certifications/") ||
    path.includes("/contact/") ||
    path.includes("/journey/")
  ) {
    return "../";
  }

  return "./";
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