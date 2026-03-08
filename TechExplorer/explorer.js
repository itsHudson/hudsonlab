const skills = {
  python: {
    icon: "🐍",
    name: "Python",
    description: "Used for scripting, automation, and structured problem solving in data-related and logical tasks.",
    projects: [
      {
        name: "Python Classroom Management System",
        summary: "A Python-based system for classroom flow and learning-related automation.",
        tech: "Python",
        github: "To be added",
        features: [
          "Structured logic flow",
          "Basic data handling",
          "Systematic feature organization"
        ]
      }
    ]
  },
  java: {
    icon: "☕",
    name: "Java",
    description: "Used for object-oriented programming, concurrency concepts, and modular application development.",
    projects: [
      {
        name: "Asia Pacific Airport Simulation",
        summary: "A Java concurrency project simulating airport operations and shared resource coordination.",
        tech: "Java, Threads, Concurrency",
        github: "To be added",
        features: [
          "Thread lifecycle management",
          "Shared resource synchronization",
          "Concurrent simulation logic"
        ]
      }
    ]
  },
  cpp: {
    icon: "💠",
    name: "C++",
    description: "Used for data structures, algorithms, memory-aware programming, and console-based systems.",
    projects: [
      {
        name: "Flight Reservation System",
        summary: "A C++ console-based system for booking, seat allocation, and passenger record management.",
        tech: "C++, Data Structures, File Handling",
        github: "To be added",
        features: [
          "Passenger registration and booking",
          "Seat allocation management",
          "CSV storage",
          "Sorting and searching logic"
        ]
      }
    ]
  },
  sql: {
    icon: "🗄️",
    name: "SQL",
    description: "Used for structured relational data management, querying, and backend database logic.",
    projects: [
      {
        name: "MyGoPandai Online Learning Platform",
        summary: "A web-based learning system with role management and database integration.",
        tech: "SQL Server, ASP.NET, HTML, CSS",
        github: "To be added",
        features: [
          "Role-based access",
          "Structured database support",
          "Course and user management"
        ]
      }
    ]
  },
  web: {
    icon: "🌐",
    name: "Web",
    description: "Used for building interface layouts, responsive design, and front-end interaction.",
    projects: [
      {
        name: "MyGoPandai Online Learning Platform",
        summary: "A web-based learning platform with structured modules for multiple user roles.",
        tech: "HTML, CSS, ASP.NET, JavaScript",
        github: "To be added",
        features: [
          "Responsive layout thinking",
          "User interface design",
          "Role-based pages"
        ]
      }
    ]
  },
  assembly: {
    icon: "⚙️",
    name: "Assembly",
    description: "Used for low-level system logic, state-driven design, and close hardware-style programming.",
    projects: [
      {
        name: "Automated Parking Control System",
        summary: "A NASM assembly project that simulates entry, exit, slot tracking, and simple revenue control.",
        tech: "NASM Assembly, System Programming",
        github: "To be added",
        features: [
          "State machine design",
          "Vehicle flow logic",
          "Slot and occupancy tracking"
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

function renderProjectDetail(project) {
  projectName.textContent = project.name;
  projectSummary.textContent = project.summary;
  projectTech.textContent = project.tech;
  projectGithub.textContent = project.github;

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
    const button = document.createElement("button");
    button.className = "project-preview-card";
    button.innerHTML = `
      <strong>${project.name}</strong>
      <span>${project.summary}</span>
    `;
    button.addEventListener("click", () => renderProjectDetail(project));
    projectList.appendChild(button);

    if (index === 0) {
      renderProjectDetail(project);
    }
  });
}

skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    skillButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderSkill(button.dataset.skill);
  });
});

renderSkill("python");