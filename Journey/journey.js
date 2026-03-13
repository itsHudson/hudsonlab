console.log("Journey system page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");
  const nodeCards = document.querySelectorAll(".journey-node-card");
  const machine = document.getElementById("journeyMachine");
  const statusText = document.getElementById("journeyStatusText");

  const insightNode = document.getElementById("insightNode");
  const insightYear = document.getElementById("insightYear");
  const insightTitle = document.getElementById("insightTitle");
  const insightOrg = document.getElementById("insightOrg");
  const insightSummary = document.getElementById("insightSummary");
  const insightTags = document.getElementById("insightTags");
  const insightLink = document.getElementById("insightLink");

  function runRevealObserver() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          let delay = "0s";

          if (entry.target.classList.contains("reveal-delay")) {
            delay = "0.12s";
          }

          if (entry.target.classList.contains("reveal-delay-2")) {
            delay = "0.22s";
          }

          entry.target.style.transition =
            "opacity 0.85s ease " + delay + ", transform 0.85s ease " + delay;

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function createTagElement(label) {
    const tag = document.createElement("span");
    tag.className = "journey-tag";
    tag.textContent = label;
    return tag;
  }

  function updateInsightPanel(card) {
    const node = card.dataset.node || "";
    const year = card.dataset.year || "";
    const title = card.dataset.title || "";
    const org = card.dataset.org || "";
    const summary = card.dataset.summary || "";
    const skills = (card.dataset.skills || "").split("|").filter(Boolean);
    const link = card.dataset.link || "#";
    const linkLabel = card.dataset.linkLabel || "Read Full Story";

    insightNode.textContent = "Node " + node;
    insightYear.textContent = year;
    insightTitle.textContent = title;
    insightOrg.textContent = org;
    insightSummary.textContent = summary;
    insightLink.setAttribute("href", link);
    insightLink.textContent = linkLabel;
    statusText.textContent = "Node " + node + " active";

    insightTags.innerHTML = "";
    skills.forEach(function (skill) {
      insightTags.appendChild(createTagElement(skill));
    });
  }

  function setActiveNode(card) {
    nodeCards.forEach(function (item) {
      item.classList.remove("is-active");
      item.classList.add("is-dimmed");
    });

    card.classList.add("is-active");
    card.classList.remove("is-dimmed");

    updateInsightPanel(card);
  }

  function wireNodeInteractions() {
    nodeCards.forEach(function (card) {
      const trigger = card.querySelector(".journey-node-trigger");

      if (!trigger) {
        return;
      }

      trigger.addEventListener("click", function () {
        setActiveNode(card);
      });

      card.addEventListener("mouseenter", function () {
        nodeCards.forEach(function (item) {
          if (item !== card && !item.classList.contains("is-active")) {
            item.classList.add("is-dimmed");
          }
        });
      });

      card.addEventListener("mouseleave", function () {
        nodeCards.forEach(function (item) {
          if (!item.classList.contains("is-active")) {
            item.classList.add("is-dimmed");
          }
        });
      });
    });
  }

  function enableMachineTilt() {
    if (!machine) {
      return;
    }

    machine.addEventListener("mousemove", function (event) {
      const rect = machine.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((mouseX - centerX) / centerX) * 3.6;
      const rotateX = ((centerY - mouseY) / centerY) * 2.6;

      machine.style.transform =
        "perspective(1400px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    machine.addEventListener("mouseleave", function () {
      machine.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    });
  }

  function enableMagneticNodes() {
    nodeCards.forEach(function (card) {
      const content = card.querySelector(".journey-node-content");
      const core = card.querySelector(".journey-node-core");

      if (!content || !core) {
        return;
      }

      card.addEventListener("mousemove", function (event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const moveX = (x - rect.width / 2) / rect.width;
        const moveY = (y - rect.height / 2) / rect.height;

        const contentShiftX = moveX * 10;
        const contentShiftY = moveY * 8;
        const coreShiftX = moveX * 6;
        const coreShiftY = moveY * 6;

        content.style.transform =
          "translate(" + contentShiftX + "px, " + contentShiftY + "px)";
        core.style.transform =
          "translate(" + coreShiftX + "px, " + coreShiftY + "px)";
      });

      card.addEventListener("mouseleave", function () {
        content.style.transform = "";
        core.style.transform = "";
      });
    });
  }

  function activateDefaultNode() {
    const defaultCard = document.querySelector('.journey-node-card[data-node="08"]');

    if (defaultCard) {
      setActiveNode(defaultCard);
    }
  }

  runRevealObserver();
  wireNodeInteractions();
  enableMachineTilt();
  enableMagneticNodes();
  activateDefaultNode();
});