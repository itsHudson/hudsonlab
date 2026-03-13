console.log("Neural Blueprint Education page loaded");

document.addEventListener("DOMContentLoaded", function () {
  initializeRevealMotion();
  initializeNeuralBlueprint();
});

function initializeRevealMotion() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

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

        entry.target.style.transition = "opacity 0.85s ease " + delay + ", transform 0.85s ease " + delay;
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
      title: "Professional Transition",
      subtitle: "5+ Years Industry Experience → Return to Computer Science",
      level: "Node 02 · Transition",
      direction: "Industry experience · career reinvention · technical shift",
      description:
        "After spending more than five years working in industry, I made the decision to return to university and pursue a degree in Computer Science. This transition marked a turning point — shifting from operational experience toward deeper technical knowledge, programming, and systems-oriented thinking.",
      qualities: [
        "Industry perspective",
        "Practical experience",
        "Adaptability",
        "Career reinvention"
      ],
      technologies: [
        "Programming",
        "Computer Science",
        "Data Analytics",
        "Systems thinking"
      ],
      quote: "Experience built perspective. Education reshaped the direction.",
      logo: "../Images/Edu_APU.png",
      logoAlt: "Professional transition"
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

  const detailPanel = document.getElementById("educationDetailPanel");
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

    if (!activeData) {
      return;
    }

    detailPanel.classList.add("detail-panel-animate");

    setTimeout(function () {
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
      activeData.qualities.forEach(function (item) {
        const chip = document.createElement("span");
        chip.className = "detail-chip";
        chip.textContent = item;
        qualityChipGrid.appendChild(chip);
      });

      techChipGrid.innerHTML = "";
      activeData.technologies.forEach(function (item) {
        const chip = document.createElement("span");
        chip.className = "detail-chip detail-chip-soft";
        chip.textContent = item;
        techChipGrid.appendChild(chip);
      });

      nodes.forEach(function (node) {
        node.classList.toggle("active", node.dataset.node === nodeKey);
      });

      moduleTags.forEach(function (tag) {
        tag.classList.toggle("active", tag.dataset.node === nodeKey);
      });

      detailPanel.classList.remove("detail-panel-animate");
    }, 180);
  }

  nodes.forEach(function (node) {
    node.addEventListener("click", function () {
      renderNode(node.dataset.node);
    });
  });

  moduleTags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      renderNode(tag.dataset.node);
    });
  });

  renderNode("foundation");
}