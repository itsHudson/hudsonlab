console.log("Neural Blueprint Education page loaded");

document.addEventListener("DOMContentLoaded", function () {
  initializeRevealMotion();
  initializeNeuralBlueprint();
});

function initializeRevealMotion() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        let delay = "0s";

        if (entry.target.classList.contains("reveal-delay")) {
          delay = "0.12s";
        }

        if (entry.target.classList.contains("reveal-delay-2")) {
          delay = "0.22s";
        }

        entry.target.style.transition = `opacity 0.85s ease ${delay}, transform 0.85s ease ${delay}`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function initializeNeuralBlueprint() {
  const nodeData = {
    foundation: {
      statusText: "Foundation Node Active",
      title: "UCSI University",
      subtitle: "Diploma in Management",
      level: "Node 01 · Foundation",
      direction: "Management thinking · discipline · academic foundation",
      description:
        "This stage established early discipline, perspective, and structured learning habits. It became the first internal layer that later supported the transition into technical thinking and systems-oriented study.",
      qualities: [
        "Discipline",
        "Perspective",
        "Structured learning",
        "Academic maturity"
      ],
      technologies: [
        "Transition readiness",
        "Structured progression",
        "Concept organisation"
      ],
      quote: "“The beginning of structured academic growth.”",
      logo: "../Images/Edu_UCSI.png",
      logoAlt: "UCSI University"
    },

    transition: {
      statusText: "Transition Node Active",
      title: "Academic Transition Phase",
      subtitle: "From management orientation to technical structure",
      level: "Node 02 · Transition",
      direction: "Systems thinking · structured logic · technical reorientation",
      description:
        "This stage represents the internal shift toward technology. It is where learning direction became more computational, more structured, and more aligned with logic, systems, and digital problem solving.",
      qualities: [
        "Systems thinking",
        "Structured logic",
        "Adaptability",
        "Cognitive shift"
      ],
      technologies: [
        "Programming readiness",
        "Problem framing",
        "System awareness"
      ],
      quote: "“The stage where structure became more computational.”",
      logo: "../Images/Edu_APU.png",
      logoAlt: "Academic transition"
    },

    specialisation: {
      statusText: "Specialisation Node Active",
      title: "Asia Pacific University",
      subtitle: "Bachelor of Science (Honours) in Computer Science · Data Analytics",
      level: "Node 03 · Specialisation",
      direction: "Computer Science · analytics · technical problem solving",
      description:
        "This stage deepened academic growth into computing, analytics, and systems. It sharpened problem solving, strengthened technical confidence, and made the language of systems central to how ideas are interpreted and built.",
      qualities: [
        "Computer Science",
        "Data Analytics",
        "Problem solving",
        "Systems mindset"
      ],
      technologies: [
        "Java",
        "Python",
        "SQL",
        "SAS",
        "Technical projects"
      ],
      quote: "“Where structured learning evolved into systems and analytics thinking.”",
      logo: "../Images/Edu_APU.png",
      logoAlt: "Asia Pacific University"
    }
  };

  const nodes = document.querySelectorAll(".cognitive-node");
  const moduleTags = document.querySelectorAll(".module-tag");

  const detailStatusText = document.getElementById("detailStatusText");
  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailLevel = document.getElementById("detailLevel");
  const detailDirection = document.getElementById("detailDirection");
  const detailDescription = document.getElementById("detailDescription");
  const detailQuote = document.getElementById("detailQuote");
  const detailLogo = document.getElementById("detailLogo");

  const qualityChipGrid = document.getElementById("qualityChipGrid");
  const techChipGrid = document.getElementById("techChipGrid");

  function renderNode(nodeKey) {
    const activeData = nodeData[nodeKey];
    if (!activeData) return;

    detailStatusText.textContent = activeData.statusText;
    detailTitle.textContent = activeData.title;
    detailSubtitle.textContent = activeData.subtitle;
    detailLevel.textContent = activeData.level;
    detailDirection.textContent = activeData.direction;
    detailDescription.textContent = activeData.description;
    detailQuote.textContent = activeData.quote;

    detailLogo.src = activeData.logo;
    detailLogo.alt = activeData.logoAlt;

    qualityChipGrid.innerHTML = "";
    activeData.qualities.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "detail-chip";
      chip.textContent = item;
      qualityChipGrid.appendChild(chip);
    });

    techChipGrid.innerHTML = "";
    activeData.technologies.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "detail-chip detail-chip-soft";
      chip.textContent = item;
      techChipGrid.appendChild(chip);
    });

    nodes.forEach((node) => {
      node.classList.toggle("active", node.dataset.node === nodeKey);
    });

    moduleTags.forEach((tag) => {
      tag.classList.toggle("active", tag.dataset.node === nodeKey);
    });
  }

  nodes.forEach((node) => {
    node.addEventListener("click", function () {
      renderNode(node.dataset.node);
    });
  });

  moduleTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      renderNode(tag.dataset.node);
    });
  });

  renderNode("foundation");
}