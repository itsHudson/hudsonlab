console.log("Education page loaded");

document.addEventListener("DOMContentLoaded", function () {
  initializeReveal();
  initializeEducationSystem();
});

function initializeReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let delay = "0s";

          if (entry.target.classList.contains("reveal-delay")) {
            delay = "0.12s";
          }

          if (entry.target.classList.contains("reveal-delay-2")) {
            delay = "0.22s";
          }

          entry.target.style.transition = `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function initializeEducationSystem() {
  const stageData = {
    ucsi: {
      title: "UCSI University",
      subtitle: "Diploma in Management",
      level: "Level 1 · Foundation",
      direction: "Management thinking · discipline · foundational perspective",
      description:
        "This stage built the earliest academic discipline, perspective, and structured learning habits that later supported the move into technology and systems thinking.",
      impactTitle: "Foundational qualities",
      impactSummary: "The mindset and qualities shaped through this stage.",
      impactChips: ["Discipline", "Structured learning", "Perspective", "Academic maturity"],
      techChips: ["Management foundation", "Transition readiness"],
      quote: "“The beginning of structured academic growth.”",
      logo: "../Images/Edu_UCSI.png",
      logoAlt: "UCSI University"
    },

    growth: {
      title: "Academic Transition Phase",
      subtitle: "From management thinking to technical thinking",
      level: "Level 2 · Growth",
      direction: "Programming logic · systems awareness · stronger technical direction",
      description:
        "This stage represents the shift from an earlier management foundation into computing, structured logic, and the kind of systems thinking that prepares the path toward computer science.",
      impactTitle: "Growth qualities",
      impactSummary: "The bridge that connected foundation with specialisation.",
      impactChips: ["Structured logic", "Systems thinking", "Adaptability", "Academic transition"],
      techChips: ["Programming readiness", "Technical exploration", "System awareness"],
      quote: "“The stage where direction became more technical.”",
      logo: "../Images/Edu_APU.png",
      logoAlt: "Academic transition"
    },

    apu: {
      title: "Asia Pacific University",
      subtitle: "Bachelor of Science (Honours) in Computer Science · Data Analytics",
      level: "Level 3 · Specialisation",
      direction: "Computer Science · analytics · problem solving · digital systems",
      description:
        "This stage deepened the journey into computing through technical problem solving, analytical thinking, systems design, and a stronger specialism in data analytics.",
      impactTitle: "Specialised qualities",
      impactSummary: "The stronger technical direction shaped through current study.",
      impactChips: ["Computer Science", "Data Analytics", "Problem solving", "Systems thinking"],
      techChips: ["Java", "Python", "SQL", "SAS", "Technical projects"],
      quote: "“Where structured discipline evolved into systems and analytics thinking.”",
      logo: "../Images/Edu_APU.png",
      logoAlt: "Asia Pacific University"
    }
  };

  const stageTitle = document.getElementById("eduStageTitle");
  const stageSubtitle = document.getElementById("eduStageSubtitle");
  const stageLevel = document.getElementById("eduLevel");
  const stageDirection = document.getElementById("eduDirection");
  const stageDescription = document.getElementById("eduDescription");

  const impactTitle = document.getElementById("eduImpactTitle");
  const impactSummary = document.getElementById("eduImpactSummary");
  const impactChipGrid = document.getElementById("impactChipGrid");
  const techChipGrid = document.getElementById("techChipGrid");
  const quoteBox = document.getElementById("eduQuoteBox");

  const logoImage = document.getElementById("eduLogoImage");

  const nodeButtons = document.querySelectorAll(".tree-node");
  const leafButtons = document.querySelectorAll(".knowledge-leaf");

  function renderStage(stageKey) {
    const stage = stageData[stageKey];
    if (!stage) return;

    stageTitle.textContent = stage.title;
    stageSubtitle.textContent = stage.subtitle;
    stageLevel.textContent = stage.level;
    stageDirection.textContent = stage.direction;
    stageDescription.textContent = stage.description;

    impactTitle.textContent = stage.impactTitle;
    impactSummary.textContent = stage.impactSummary;
    quoteBox.textContent = stage.quote;

    logoImage.src = stage.logo;
    logoImage.alt = stage.logoAlt;

    impactChipGrid.innerHTML = "";
    stage.impactChips.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "impact-chip";
      chip.textContent = item;
      impactChipGrid.appendChild(chip);
    });

    techChipGrid.innerHTML = "";
    stage.techChips.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "impact-chip impact-chip-soft";
      chip.textContent = item;
      techChipGrid.appendChild(chip);
    });

    nodeButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.node === stageKey);
    });

    leafButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.node === stageKey);
    });
  }

  nodeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      renderStage(button.dataset.node);
    });
  });

  leafButtons.forEach((button) => {
    button.addEventListener("click", function () {
      renderStage(button.dataset.node);
    });
  });

  renderStage("ucsi");
}