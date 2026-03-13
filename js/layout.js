function getBasePath() {
  const path = window.location.pathname.toLowerCase();

  if (
    path.includes("/about/") ||
    path.includes("/techexplorer/") ||
    path.includes("/experience/") ||
    path.includes("/education/") ||
    path.includes("/certifications/") ||
    path.includes("/contact/")
  ) {
    return "../";
  }

  return "./";
}

function loadComponent(id, filePath) {
  const target = document.getElementById(id);

  if (!target) {
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
    })
    .catch(function (error) {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const basePath = getBasePath();

  loadComponent("header", basePath + "Components/header.html");
  loadComponent("footer", basePath + "Components/footer.html");
});