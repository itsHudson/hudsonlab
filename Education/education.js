console.log("EDU.SYS loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const revealItems = document.querySelectorAll(".sys-reveal, .sys-reveal-delay, .sys-reveal-stagger");
  const meterBars = document.querySelectorAll(".meter-bar span");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const progressionNodes = document.querySelectorAll(".progression-node");
  const staggerGroups = document.querySelectorAll(".focus-grid, .foundation-grid, .modules-grid");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.classList.contains("sys-reveal-stagger")) {
            target.style.transition = "opacity 0.75s ease, transform 0.75s ease";
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          } else {
            target.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }

          observer.unobserve(target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealItems.forEach(function (item, index) {
    if (item.classList.contains("sys-reveal-delay")) {
      item.style.transitionDelay = "0.12s";
    }

    if (item.classList.contains("sys-reveal-stagger")) {
      const staggerIndex = index % 6;
      item.style.transitionDelay = (staggerIndex * 0.08) + "s";
    }

    revealObserver.observe(item);
  });

  const meterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".meter-bar span");

          bars.forEach(function (bar) {
            const widthValue = bar.getAttribute("data-width");
            if (widthValue) {
              bar.style.width = widthValue;
            }
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  document.querySelectorAll(".education-subpanel").forEach(function (panel) {
    if (panel.querySelector(".meter-bar span")) {
      meterObserver.observe(panel);
    }
  });

  tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      if (window.innerWidth <= 980) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 2.8;
      const rotateX = ((y / rect.height) - 0.5) * -2.2;

      card.style.transform =
        "perspective(1000px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  progressionNodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      node.style.transform = "translateY(-4px)";
    });

    node.addEventListener("mouseleave", function () {
      node.style.transform = "";
    });
  });

  staggerGroups.forEach(function (group) {
    const children = group.children;

    Array.from(children).forEach(function (child, index) {
      if (
        child.classList.contains("focus-box") ||
        child.classList.contains("foundation-box") ||
        child.classList.contains("module-card")
      ) {
        child.classList.add("sys-reveal-stagger");
        child.style.transitionDelay = (index * 0.08) + "s";
        revealObserver.observe(child);
      }
    });
  });
});