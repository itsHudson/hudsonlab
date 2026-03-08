const skills = {
  python: {
    icon: "🐍",
    name: "Python",
    description:
      "Python is used for automation, scripting, and building data-oriented workflows with strong readability and efficiency.",
    projects: [
      {
        name: "Technology Automation Concepts",
        summary:
          "Python represents my interest in automation, logic flow, and building tools that simplify structured tasks.",
        tech: "Python",
        github: "To be added",
        thumb: "Automation · Logic · Data Thinking",
        features: [
          "Readable logic structure",
          "Strong scripting capability",
          "Useful for automation and analysis"
        ]
      }
    ]
  },

  cpp: {
    icon: "💠",
    name: "C++",
    description:
      "C++ is used to build high performance systems and implement data structure driven solutions.",
    projects: [
      {
        name: "Bus Reservation System",
        summary:
          "A structured reservation system built with logic focused on data organization, booking flow, and system behavior.",
        tech: "C++",
        github: "https://github.com/itsHudson/BusReservationSystem",
        thumb: "Data Structures · System Logic",
        features: [
          "Seat reservation logic",
          "Passenger data handling",
          "File-based workflow"
        ]
      }
    ]
  },

  java: {
    icon: "☕",
    name: "Java",
    description:
      "Java is used to design object-oriented applications and simulate real-world system workflows.",
    projects: [
      {
        name: "OODJ Medical System",
        summary:
          "A clinic system concept developed with object-oriented thinking and structured system design.",
        tech: "Java",
        github: "https://github.com/itsHudson/OODJMedicalSystem",
        thumb: "Object-Oriented Design · Structured Applications",
        features: [
          "Patient record flow",
          "System structure through OOP",
          "Practical application modeling"
        ]
      }
    ]
  },

  html: {
    icon: "🌐",
    name: "HTML",
    description:
      "HTML provides the foundational structure for presenting systems, information, and digital experiences on the web.",
    projects: [
      {
        name: "Personal Brand Website",
        summary:
          "This website itself reflects how structure, hierarchy, and intention shape a public-facing digital presence.",
        tech: "HTML",
        github: "To be added",
        thumb: "Structure · Semantic Layout · Web Foundation",
        features: [
          "Semantic structure",
          "Content hierarchy",
          "Public-facing layout logic"
        ]
      }
    ]
  },

  css: {
    icon: "🎨",
    name: "CSS",
    description:
      "CSS allows me to shape visual identity, interaction quality, typography hierarchy, and design atmosphere.",
    projects: [
      {
        name: "Visual Interface Direction",
        summary:
          "CSS is where interface tone, movement, premium spacing, and visual consistency come together.",
        tech: "CSS",
        github: "To be added",
        thumb: "Design System · Visual Identity · Motion",
        features: [
          "Typography control",
          "Premium layout spacing",
          "Color, motion, and interaction"
        ]
      }
    ]
  },

  sql: {
    icon: "🗄️",
    name: "SQL",
    description:
      "SQL is essential for structured data, relational thinking, and systems that rely on information architecture.",
    projects: [
      {
        name: "MyGoPandai Data Foundation",
        summary:
          "Database structure and relational logic are central to how digital systems remain useful, organized, and scalable.",
        tech: "SQL · SQL Server",
        github: "https://github.com/itsHudson/MyGoPandai",
        thumb: "Database Logic · Structured Information",
        features: [
          "Relational data design",
          "Query-based structure",
          "Scalable backend thinking"
        ]
      }
    ]
  }
};

const skillButtons = document.querySelectorAll(".orbit-skill");

const skillIcon = document.getElementById("skillIcon");
const skillName = document.getElementById("skillName");
const skillDescription = document.getElementById("skillDescription");

const projectList = document.getElementById("projectList");

const projectName = document.getElementById("projectName");
const projectSummary = document.getElementById("projectSummary");
const projectTech = document.getElementById("projectTech");
const projectGithub = document.getElementById("projectGithub");
const projectFeatures = document.getElementById("projectFeatures");
const projectThumbPreview = document.getElementById("projectThumbPreview");

const orbitShell = document.getElementById("orbitShell");

let orbitRotation = 0;
let isDragging = false;
let startX = 0;
let startRotation = 0;

function updateOrbitRotation() {
  orbitShell.style.setProperty("--orbit-rotation", `${orbitRotation}deg`);
}

function renderProjectDetail(project) {
  projectName.textContent = project.name;
  projectSummary.textContent = project.summary;
  projectTech.textContent = project.tech;

  if (project.github && project.github !== "To be added") {
    projectGithub.innerHTML = `<a href="${project.github}" target="_blank">${project.github}</a>`;
  } else {
    projectGithub.textContent = "Available upon request";
  }

  projectThumbPreview.textContent = project.thumb;

  projectFeatures.innerHTML = "";

  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    projectFeatures.appendChild(li);
  });
}

function renderSkill(skillKey) {
  const skill = skills[skillKey];
  if (!skill) return;

  skillIcon.textContent = skill.icon;
  skillName.textContent = skill.name;
  skillDescription.textContent = skill.description;

  projectList.innerHTML = "";

  skill.projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-preview-card";

    card.innerHTML = `
      <strong>${project.name}</strong>
      <p>${project.summary}</p>
    `;

    card.onclick = () => renderProjectDetail(project);
    projectList.appendChild(card);

    if (index === 0) {
      renderProjectDetail(project);
    }
  });
}

skillButtons.forEach((btn) => {
  btn.onclick = () => {
    skillButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderSkill(btn.dataset.skill);
  };
});

orbitShell.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.clientX;
  startRotation = orbitRotation;
  orbitShell.classList.add("dragging");
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  const delta = event.clientX - startX;
  orbitRotation = startRotation + delta * 0.6;
  updateOrbitRotation();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  orbitShell.classList.remove("dragging");
});

orbitShell.addEventListener("touchstart", (event) => {
  isDragging = true;
  startX = event.touches[0].clientX;
  startRotation = orbitRotation;
  orbitShell.classList.add("dragging");
}, { passive: true });

window.addEventListener("touchmove", (event) => {
  if (!isDragging) return;
  const delta = event.touches[0].clientX - startX;
  orbitRotation = startRotation + delta * 0.6;
  updateOrbitRotation();
}, { passive: true });

window.addEventListener("touchend", () => {
  isDragging = false;
  orbitShell.classList.remove("dragging");
});

updateOrbitRotation();
renderSkill("python");