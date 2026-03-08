const skills = {
  python: {
    icon: "Images/tech/python.svg",
    name: "Python",
    description: "Python represents flexibility, speed, and the ability to create useful technical solutions through scripting, automation, and structured logic.",
    meaning: "A language that supports practical problem solving, analytical thinking, and systems that benefit from adaptability.",
    direction: "Automation · scripting · data-oriented workflows",
    projects: [
      {
        name: "Technology Automation Concepts",
        summary: "Python reflects my interest in building structured technical workflows that simplify tasks and strengthen analytical processes.",
        tech: "Python",
        github: "Available upon request",
        thumb: "Automation · Logic · Data Thinking",
        features: [
          "Useful for scripting and process automation",
          "Strong readability for structured development",
          "Widely suited for flexible technical workflows"
        ]
      }
    ]
  },

  java: {
    icon: "Images/tech/java.svg",
    name: "Java",
    description: "Java represents object-oriented thinking, application structure, and the ability to model real-world logic through scalable software design.",
    meaning: "A language that supports disciplined architecture and stronger abstraction through class-based design.",
    direction: "Object-oriented systems · structured application design",
    projects: [
      {
        name: "OODJ Medical System",
        summary: "A system concept built around object-oriented design principles to model a practical clinic workflow environment.",
        tech: "Java",
        github: "https://github.com/itsHudson/OODJMedicalSystem",
        thumb: "Object-Oriented Design · Structured Applications",
        features: [
          "Patient record management",
          "Real-world process modelling",
          "Clear class-based structure"
        ]
      }
    ]
  },

  cpp: {
    icon: "Images/tech/cpp.svg",
    name: "C++",
    description: "C++ represents systems thinking, data structures, performance awareness, and direct control over logic flow and implementation.",
    meaning: "A language strongly connected to algorithms, computational structure, and precise system behaviour.",
    direction: "Data structures · system logic · performance-minded programming",
    projects: [
      {
        name: "Bus Reservation System",
        summary: "A reservation system built around structured logic, data organisation, and process flow for booking and passenger handling.",
        tech: "C++",
        github: "https://github.com/itsHudson/BusReservationSystem",
        thumb: "Data Structures · Reservation Logic",
        features: [
          "Booking flow design",
          "Structured record handling",
          "File-based workflow management"
        ]
      }
    ]
  },

  javascript: {
    icon: "Images/tech/javascript.svg",
    name: "JavaScript",
    description: "JavaScript represents movement, interaction, responsiveness, and the layer that turns static structure into living digital behaviour.",
    meaning: "A language that bridges interface and experience by making systems interactive, dynamic, and responsive.",
    direction: "Interaction · behaviour · dynamic interfaces",
    projects: [
      {
        name: "Interactive Website Behaviour",
        summary: "JavaScript powers motion, orbit interaction, section dynamics, and the overall responsiveness of this digital experience.",
        tech: "JavaScript",
        github: "Available upon request",
        thumb: "Interaction · Motion · Interface Logic",
        features: [
          "Dynamic user interaction",
          "Behaviour-driven interface updates",
          "Brings static design into motion"
        ]
      }
    ]
  },

  html: {
    icon: "Images/tech/html.svg",
    name: "HTML",
    description: "HTML represents structure, semantic organisation, and the foundational layout of digital experiences on the web.",
    meaning: "The framework through which content is shaped into clear, navigable, and meaningful web experiences.",
    direction: "Semantic structure · page architecture · public-facing layout",
    projects: [
      {
        name: "Personal Brand Website",
        summary: "This website itself reflects the role of HTML in shaping a structured, intentional, and public-facing digital presence.",
        tech: "HTML",
        github: "Available upon request",
        thumb: "Structure · Hierarchy · Web Foundation",
        features: [
          "Semantic page structure",
          "Clear navigation and hierarchy",
          "Foundation for premium web presentation"
        ]
      }
    ]
  },

  css: {
    icon: "Images/tech/css.svg",
    name: "CSS",
    description: "CSS represents visual identity, hierarchy, premium spacing, motion, and the design system that gives a digital product its atmosphere.",
    meaning: "The layer where typography, spacing, colour, and interface quality become intentional design rather than decoration.",
    direction: "Design systems · typography · visual language",
    projects: [
      {
        name: "Interface Design Direction",
        summary: "CSS allows this website to communicate taste, rhythm, clarity, and a stronger premium visual identity.",
        tech: "CSS",
        github: "Available upon request",
        thumb: "Visual Identity · Motion · Detail Control",
        features: [
          "Typography and spacing control",
          "Interaction and hover behaviour",
          "Brand-level visual consistency"
        ]
      }
    ]
  },

  sql: {
    icon: "Images/tech/sql.svg",
    name: "SQL",
    description: "SQL represents structured data thinking, relational logic, and the architecture required to organise information meaningfully.",
    meaning: "A core technology for designing systems that depend on clarity, relationships, and information reliability.",
    direction: "Relational data · database logic · structured systems",
    projects: [
      {
        name: "MyGoPandai Data Foundation",
        summary: "Database design and relational logic form an important part of how digital systems remain useful, organised, and scalable.",
        tech: "SQL · SQL Server",
        github: "https://github.com/itsHudson/MyGoPandai",
        thumb: "Database Logic · Structured Information",
        features: [
          "Relational data design",
          "Structured information modelling",
          "Supports scalable application architecture"
        ]
      }
    ]
  },

  r: {
    icon: "Images/tech/r.svg",
    name: "R",
    description: "R represents analytical modelling, statistical reasoning, and a stronger connection between data and interpretable insights.",
    meaning: "A technology aligned with deeper analytical work, data interpretation, and evidence-based exploration.",
    direction: "Statistical analysis · modelling · insight generation",
    projects: [
      {
        name: "Analytical Exploration",
        summary: "R reflects a growing direction toward data analysis and the ability to interpret patterns with technical depth.",
        tech: "R",
        github: "Available upon request",
        thumb: "Statistics · Analysis · Insight",
        features: [
          "Analytical reasoning",
          "Data interpretation support",
          "Strong relevance to data-centric work"
        ]
      }
    ]
  },

  sas: {
    icon: "Images/tech/sas.svg",
    name: "SAS",
    description: "SAS represents analytical workflow, predictive thinking, and a more applied approach to structured data modelling.",
    meaning: "A toolset connected to business analytics, predictive understanding, and the practical side of data-driven insight.",
    direction: "Predictive modelling · business analytics · data workflows",
    projects: [
      {
        name: "Data Modelling Direction",
        summary: "SAS reflects my interest in applied analytics, modelling, and structured approaches to data-driven understanding.",
        tech: "SAS",
        github: "Available upon request",
        thumb: "Analytics · Modelling · Applied Data Thinking",
        features: [
          "Structured modelling approach",
          "Business-aligned analytics capability",
          "Supports data-driven decision making"
        ]
      }
    ]
  }
};

const skillButtons = document.querySelectorAll(".orbit-skill");
const skillIcon = document.getElementById("skillIcon");
const skillName = document.getElementById("skillName");
const skillDescription = document.getElementById("skillDescription");
const skillMeaning = document.getElementById("skillMeaning");
const skillDirection = document.getElementById("skillDirection");
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

  projectGithub.innerHTML =
    project.github !== "Available upon request"
      ? `<a href="${project.github}" target="_blank">${project.github}</a>`
      : "Available upon request";

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

  if (!skill) {
    return;
  }

  skillIcon.textContent = skill.icon;
  skillName.textContent = skill.name;
  skillDescription.textContent = skill.description;
  skillMeaning.textContent = skill.meaning;
  skillDirection.textContent = skill.direction;
  projectList.innerHTML = "";

  skill.projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-preview-card";
    card.innerHTML = `<strong>${project.name}</strong><p>${project.summary}</p>`;
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
  if (!isDragging) {
    return;
  }

  const delta = event.clientX - startX;
  orbitRotation = startRotation + delta * 0.6;
  updateOrbitRotation();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  orbitShell.classList.remove("dragging");
});

orbitShell.addEventListener(
  "touchstart",
  (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    startRotation = orbitRotation;
    orbitShell.classList.add("dragging");
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    if (!isDragging) {
      return;
    }

    const delta = event.touches[0].clientX - startX;
    orbitRotation = startRotation + delta * 0.6;
    updateOrbitRotation();
  },
  { passive: true }
);

window.addEventListener("touchend", () => {
  isDragging = false;
  orbitShell.classList.remove("dragging");
});

updateOrbitRotation();
renderSkill("python");