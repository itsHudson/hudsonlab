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

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) {
      return;
    }

    machine.addEventListener("mousemove", function (event) {
      const rect = machine.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((mouseX - centerX) / centerX) * 3.8;
      const rotateX = ((centerY - mouseY) / centerY) * 2.8;

      machine.style.transform =
        "perspective(1400px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      machine.style.setProperty("--glow-x", mouseX + "px");
      machine.style.setProperty("--glow-y", mouseY + "px");
    });

    machine.addEventListener("mouseleave", function () {
      machine.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
      machine.style.setProperty("--glow-x", "50%");
      machine.style.setProperty("--glow-y", "50%");
    });
  }

  function enableMagneticNodes() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) {
      return;
    }

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

        const contentShiftX = moveX * 12;
        const contentShiftY = moveY * 9;
        const coreShiftX = moveX * 7;
        const coreShiftY = moveY * 7;

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
    const defaultCard = document.querySelector('.journey-node-card[data-node="01"]');

    if (defaultCard) {
      setActiveNode(defaultCard);
    }
  }

  function autoActivateOnScroll() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          if (entry.intersectionRatio >= 0.55) {
            setActiveNode(entry.target);
          }
        });
      },
      {
        threshold: [0.55, 0.7, 0.9]
      }
    );

    nodeCards.forEach(function (card) {
      observer.observe(card);
    });
  }

  function initializeJourneyBackgroundMotion() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const glowLayers = document.querySelectorAll(".journey-bg-glow");
    const archiveLayers = document.querySelectorAll(".journey-bg-archive-cards");
    const signalLines = document.querySelector(".journey-bg-signal-lines");

    if (reduceMotion) {
      return;
    }

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId = null;

    function animate() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      glowLayers.forEach(function (layer, index) {
        const strength = (index + 1) * 6;
        layer.style.transform =
          "translate3d(" + (currentX * strength) + "px," + (currentY * strength * 0.8) + "px,0)";
      });

      archiveLayers.forEach(function (layer, index) {
        const strength = (index + 1) * 4;
        layer.style.transform =
          "translate3d(" + (currentX * strength) + "px," + (currentY * strength * 0.8) + "px,0)";
      });

      if (signalLines) {
        signalLines.style.transform =
          "translate3d(" + (currentX * 3) + "px," + (currentY * 3) + "px,0)";
      }

      const deltaX = Math.abs(targetX - currentX);
      const deltaY = Math.abs(targetY - currentY);

      if (deltaX < 0.001 && deltaY < 0.001) {
        animationFrameId = null;
        return;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    }

    if (canHover) {
      window.addEventListener("mousemove", function (event) {
        const width = window.innerWidth || 1;
        const height = window.innerHeight || 1;

        targetX = (event.clientX / width - 0.5) * 2;
        targetY = (event.clientY / height - 0.5) * 2;

        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(animate);
        }
      });

      window.addEventListener("mouseleave", function () {
        targetX = 0;
        targetY = 0;

        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(animate);
        }
      });
    }

    let scrollTicking = false;
    const scanLayer = document.querySelector(".journey-bg-scan");

    function updateScrollEffects() {
      const scrollY = window.scrollY || 0;

      if (scanLayer) {
        scanLayer.style.opacity = String(Math.min(0.18, 0.08 + scrollY * 0.00008));
      }

      scrollTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
      }
    });

    updateScrollEffects();
  }

  runRevealObserver();
  wireNodeInteractions();
  enableMachineTilt();
  enableMagneticNodes();
  activateDefaultNode();
  autoActivateOnScroll();
  initializeJourneyBackgroundMotion();
});