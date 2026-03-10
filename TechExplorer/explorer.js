const iconHtml = {
  mysql: '<i class="devicon-mysql-original colored" aria-hidden="true"></i>',
  sqlserver: '<img src="../Images/TE_SQLServer.png" alt="Microsoft SQL Server">',
  linux: '<i class="devicon-linux-plain colored" aria-hidden="true"></i>',

  visualstudio: '<i class="devicon-visualstudio-plain colored" aria-hidden="true"></i>',
  vscode: '<i class="devicon-vscode-plain colored" aria-hidden="true"></i>',
  netbeans: '<i class="devicon-apache-line colored" aria-hidden="true"></i>',
  codeblocks: '<img src="https://img.icons8.com/color/480/code-blocks.png" alt="Code::Blocks">',
  git: '<i class="devicon-git-plain colored" aria-hidden="true"></i>',
  github: '<i class="devicon-github-original" aria-hidden="true"></i>',
  aspnet: '<i class="devicon-dot-net-plain colored" aria-hidden="true"></i>',

  assembly: '<div class="custom-asm-badge" aria-hidden="true">ASM</div>',
  c: '<i class="devicon-c-plain colored" aria-hidden="true"></i>',
  cpp: '<i class="devicon-cplusplus-plain colored" aria-hidden="true"></i>',
  csharp: '<i class="devicon-csharp-plain colored" aria-hidden="true"></i>',
  css: '<i class="devicon-css3-plain colored" aria-hidden="true"></i>',
  java: '<i class="devicon-java-plain colored" aria-hidden="true"></i>',
  python: '<i class="devicon-python-plain colored" aria-hidden="true"></i>',
  javascript: '<i class="devicon-javascript-plain colored" aria-hidden="true"></i>',
  r: '<i class="devicon-r-plain colored" aria-hidden="true"></i>',
  sql: '<i class="devicon-azuresqldatabase-plain colored" aria-hidden="true"></i>',
  html5: '<i class="devicon-html5-plain colored" aria-hidden="true"></i>',
  sas: '<div class="custom-sas-badge" aria-hidden="true">SAS</div>'
};

const techOrder = [
  { key: "mysql", ring: 1, angle: 0, radius: 102, label: "MySQL" },
  { key: "sqlserver", ring: 1, angle: 180, radius: 102, label: "SQL Server" },

  { key: "linux", ring: 2, angle: 0, radius: 155, label: "Linux" },

  { key: "visualstudio", ring: 3, angle: 0, radius: 225, label: "Visual Studio" },
  { key: "vscode", ring: 3, angle: 45, radius: 225, label: "VS Code" },
  { key: "netbeans", ring: 3, angle: 90, radius: 225, label: "NetBeans" },
  { key: "codeblocks", ring: 3, angle: 135, radius: 225, label: "Code::Blocks" },
  { key: "git", ring: 3, angle: 225, radius: 225, label: "Git" },
  { key: "github", ring: 3, angle: 270, radius: 225, label: "GitHub" },
  { key: "aspnet", ring: 3, angle: 315, radius: 225, label: "ASP.NET" },

  { key: "assembly", ring: 4, angle: 0, radius: 310, label: "Assembly" },
  { key: "c", ring: 4, angle: 30, radius: 310, label: "C" },
  { key: "cpp", ring: 4, angle: 60, radius: 310, label: "C++" },
  { key: "csharp", ring: 4, angle: 90, radius: 310, label: "C#" },
  { key: "css", ring: 4, angle: 120, radius: 310, label: "CSS" },
  { key: "java", ring: 4, angle: 150, radius: 310, label: "Java" },
  { key: "python", ring: 4, angle: 180, radius: 310, label: "Python" },
  { key: "javascript", ring: 4, angle: 210, radius: 310, label: "JavaScript" },
  { key: "r", ring: 4, angle: 240, radius: 310, label: "R" },
  { key: "sql", ring: 4, angle: 270, radius: 310, label: "SQL" },
  { key: "html5", ring: 4, angle: 300, radius: 310, label: "HTML5" },
  { key: "sas", ring: 4, angle: 330, radius: 310, label: "SAS" }
];

const skills = {
  mysql: {
    name: "MySQL",
    icon: iconHtml.mysql,
    description: "MySQL represents structured relational data, practical database design, and the ability to organise application data clearly and reliably.",
    meaning: "Data organisation, relational thinking, and strong support for application-level information systems.",
    direction: "Relational databases · structured storage · application backends",
    projects: [
      {
        name: "Database Foundation Work",
        summary: "MySQL reflects my understanding of structured storage, relational modelling, and clean database organisation for software systems.",
        tech: "MySQL",
        github: "Available upon request",
        thumb: "Relational Design · Structured Storage · Database Thinking",
        features: [
          "Supports structured and organised relational data",
          "Useful for scalable backend information storage",
          "Strengthens application-level database logic"
        ]
      }
    ]
  },

  sqlserver: {
    name: "Microsoft SQL Server",
    icon: iconHtml.sqlserver,
    description: "Microsoft SQL Server represents enterprise-style relational data management, stronger schema control, and the backbone of database-driven application systems.",
    meaning: "A more structured and platform-oriented database environment for reliable system data handling.",
    direction: "Database systems · SQL Server development · structured application data",
    projects: [
      {
        name: "MyGoPandai Database Structure",
        summary: "SQL Server is used as a core data layer for managing users, lessons, courses, records, and relationships inside a structured web application environment.",
        tech: "Microsoft SQL Server",
        github: "Available upon request",
        thumb: "Schema Design · Data Integrity · System Records",
        features: [
          "Supports relational application data",
          "Useful for structured schema and table design",
          "Strong fit for backend-driven systems"
        ]
      }
    ]
  },

  linux: {
    name: "Linux (Ubuntu)",
    icon: iconHtml.linux,
    description: "Linux represents operating-system awareness, command-line confidence, and a stronger understanding of how software interacts with execution environments.",
    meaning: "An environment that reflects system understanding, platform awareness, and technical workflow discipline.",
    direction: "Operating systems · command line · platform understanding",
    projects: [
      {
        name: "System Environment Direction",
        summary: "Linux supports stronger familiarity with environments, processes, and technical workflow behaviour beyond application-only development.",
        tech: "Linux · Ubuntu",
        github: "Available upon request",
        thumb: "Environment Awareness · System Thinking · Technical Workflow",
        features: [
          "Builds stronger execution-environment awareness",
          "Supports terminal-based and system-level thinking",
          "Strengthens technical confidence beyond UI-level work"
        ]
      }
    ]
  },

  visualstudio: {
    name: "Visual Studio",
    icon: iconHtml.visualstudio,
    description: "Visual Studio represents full-scale application development, especially for structured .NET projects and larger software workflows.",
    meaning: "A professional IDE aligned with application architecture, backend logic, and organised project structure.",
    direction: ".NET development · application architecture · IDE workflow",
    projects: [
      {
        name: "ASP.NET Application Development",
        summary: "Visual Studio supports structured solution management, page logic, database integration, and larger application workflows in a professional development environment.",
        tech: "Visual Studio",
        github: "Available upon request",
        thumb: "IDE Workflow · Solution Management · Application Development",
        features: [
          "Strong for structured project development",
          "Supports database-connected application work",
          "Well suited for ASP.NET and C# workflows"
        ]
      }
    ]
  },

  vscode: {
    name: "Visual Studio Code",
    icon: iconHtml.vscode,
    description: "Visual Studio Code represents lightweight and flexible coding, ideal for front-end work, scripting, and fast project navigation.",
    meaning: "A clean and efficient development environment for modern coding workflows and web-oriented tasks.",
    direction: "Web development · scripting · lightweight coding workflow",
    projects: [
      {
        name: "Portfolio Website Development",
        summary: "Visual Studio Code supports clean editing, quick iteration, and efficient development for interface and front-end focused projects.",
        tech: "Visual Studio Code",
        github: "Available upon request",
        thumb: "Fast Editing · Web Workflow · Flexible Development",
        features: [
          "Excellent for front-end and scripting tasks",
          "Supports rapid iteration and clean structure",
          "Fits modern lightweight development workflows"
        ]
      }
    ]
  },

  netbeans: {
    name: "Apache NetBeans",
    icon: iconHtml.netbeans,
    description: "Apache NetBeans represents structured Java development and class-oriented software construction in an academic and project-based environment.",
    meaning: "A Java-focused IDE that supports object-oriented development and organised application structure.",
    direction: "Java IDE workflow · OOP development · project organisation",
    projects: [
      {
        name: "Java Coursework Development",
        summary: "NetBeans supports structured Java programming, interface management, and class-based project organisation in a stable IDE environment.",
        tech: "Apache NetBeans",
        github: "Available upon request",
        thumb: "Java IDE · OOP Workflow · Structured Coding",
        features: [
          "Useful for class-based Java projects",
          "Supports organised development structure",
          "Suitable for academic software work"
        ]
      }
    ]
  },

  codeblocks: {
    name: "Code::Blocks",
    icon: iconHtml.codeblocks,
    description: "Code::Blocks represents foundational C and C++ development with emphasis on algorithms, system logic, and structured programming practice.",
    meaning: "A lightweight IDE used for building programming fundamentals and algorithmic thinking.",
    direction: "C/C++ development · algorithms · structured programming",
    projects: [
      {
        name: "C and C++ Foundation Development",
        summary: "Code::Blocks supports structured coding exercises, data structures, and logic-focused development using foundational programming languages.",
        tech: "Code::Blocks",
        github: "Available upon request",
        thumb: "Core Programming · Algorithms · Logic Practice",
        features: [
          "Useful for C and C++ coursework",
          "Supports structured logic practice",
          "Fits algorithm and data structure development"
        ]
      }
    ]
  },

  git: {
    name: "Git",
    icon: iconHtml.git,
    description: "Git represents version control, development discipline, and the ability to manage code changes systematically over time.",
    meaning: "A core tool for maintaining software history, collaboration readiness, and controlled project evolution.",
    direction: "Version control · code history · development workflow",
    projects: [
      {
        name: "Versioned Development Practice",
        summary: "Git supports cleaner project management through tracked changes, rollback capability, and disciplined software progression.",
        tech: "Git",
        github: "Available upon request",
        thumb: "Code History · Commit Discipline · Development Control",
        features: [
          "Tracks project changes over time",
          "Supports safer development progression",
          "Builds professional workflow habits"
        ]
      }
    ]
  },

  github: {
    name: "GitHub",
    icon: iconHtml.github,
    description: "GitHub represents project visibility, repository management, and a public-facing layer for code sharing and technical presentation.",
    meaning: "A platform that connects code, portfolio presence, and collaboration-ready software publishing.",
    direction: "Repository hosting · portfolio presentation · code sharing",
    projects: [
      {
        name: "Public Code Presence",
        summary: "GitHub helps organise repositories, showcase projects, and present technical development in a more visible and professional way.",
        tech: "GitHub",
        github: "Available upon request",
        thumb: "Repositories · Public Presence · Technical Portfolio",
        features: [
          "Supports project publishing and presentation",
          "Improves visibility of technical work",
          "Useful for code portfolio development"
        ]
      }
    ]
  },

  aspnet: {
    name: "ASP.NET",
    icon: iconHtml.aspnet,
    description: "ASP.NET represents structured web application development using server-side logic, page-driven architecture, and integrated backend workflows.",
    meaning: "A framework aligned with database-connected systems, role-based applications, and scalable web functionality.",
    direction: "Web application development · server-side logic · .NET systems",
    projects: [
      {
        name: "MyGoPandai E-Learning Platform",
        summary: "ASP.NET supports page logic, user roles, data interaction, and full application structure for a multi-module educational platform.",
        tech: "ASP.NET · C# · SQL Server",
        github: "Available upon request",
        thumb: "Server-Side Web Logic · Roles · Structured Application Flow",
        features: [
          "Supports role-based application design",
          "Strong integration with backend data systems",
          "Useful for larger web application architecture"
        ]
      }
    ]
  },

  assembly: {
    name: "Assembly",
    icon: iconHtml.assembly,
    description: "Assembly represents direct system-level control, low-level execution awareness, and precise understanding of how logic maps into machine behaviour.",
    meaning: "A technical area that reflects discipline, detail, and deeper interest in how systems operate underneath abstraction.",
    direction: "Low-level systems · execution flow · technical precision",
    projects: [
      {
        name: "Automated Parking Control System",
        summary: "Assembly is used to strengthen understanding of direct logic flow, state handling, and close-to-machine execution in a structured system context.",
        tech: "Assembly",
        github: "Available upon request",
        thumb: "Low-Level Logic · State Machine · Direct Execution",
        features: [
          "Strengthens low-level systems understanding",
          "Supports precise control flow awareness",
          "Builds deeper technical execution knowledge"
        ]
      }
    ]
  },

  c: {
    name: "C",
    icon: iconHtml.c,
    description: "C represents programming fundamentals, system behaviour awareness, and a disciplined approach to structured problem solving.",
    meaning: "A foundational language that strengthens logic, memory awareness, and technical discipline.",
    direction: "Programming fundamentals · system behaviour · core logic",
    projects: [
      {
        name: "Core Programming Foundation",
        summary: "C supports the foundations of structured programming and builds stronger understanding of how software behaves at a more direct level.",
        tech: "C",
        github: "Available upon request",
        thumb: "Fundamentals · Logic Discipline · System Awareness",
        features: [
          "Builds strong programming foundations",
          "Improves system-level awareness",
          "Encourages precise logical structure"
        ]
      }
    ]
  },

  cpp: {
    name: "C++",
    icon: iconHtml.cpp,
    description: "C++ represents systems thinking, data structures, and performance-aware programming with stronger control over implementation logic.",
    meaning: "A language closely tied to algorithms, structural design, and computational efficiency.",
    direction: "Data structures · algorithmic thinking · performance-minded programming",
    projects: [
      {
        name: "Bus Reservation System",
        summary: "C++ is used to build structured logic for booking workflows, data organisation, and process-driven application behaviour.",
        tech: "C++",
        github: "Available upon request",
        thumb: "Data Structures · Reservation Logic · Structured Flow",
        features: [
          "Useful for structured algorithm design",
          "Supports system logic and data handling",
          "Strong fit for performance-aware development"
        ]
      }
    ]
  },

  csharp: {
    name: "C#",
    icon: iconHtml.csharp,
    description: "C# represents application structure, object-oriented design, and backend logic for modern .NET-based systems.",
    meaning: "A language that supports scalable application development, clean architecture, and structured business logic.",
    direction: ".NET development · OOP · application logic",
    projects: [
      {
        name: "MyGoPandai System Development",
        summary: "C# is used for page logic, data communication, role-based behaviour, and overall application structure inside a .NET environment.",
        tech: "C# · ASP.NET",
        github: "Available upon request",
        thumb: "Application Logic · OOP · Structured Web Development",
        features: [
          "Supports scalable application logic",
          "Strong alignment with ASP.NET workflows",
          "Useful for role-based system behaviour"
        ]
      }
    ]
  },

  css: {
    name: "CSS",
    icon: iconHtml.css,
    description: "CSS represents visual identity, layout rhythm, spacing control, and the design system layer that shapes interface atmosphere.",
    meaning: "The language of presentation, hierarchy, motion, and premium visual communication on the web.",
    direction: "Design systems · interface styling · visual language",
    projects: [
      {
        name: "HUDSONLAB Interface Design",
        summary: "CSS gives structure, branding, premium spacing, responsive design, and polished motion to the overall digital experience.",
        tech: "CSS",
        github: "Available upon request",
        thumb: "Visual Identity · Layout Rhythm · Design Control",
        features: [
          "Controls layout, spacing, and typography",
          "Builds a stronger premium visual identity",
          "Supports interaction and polished presentation"
        ]
      }
    ]
  },

  java: {
    name: "Java",
    icon: iconHtml.java,
    description: "Java represents object-oriented thinking, structured application design, and class-based development. It is especially connected to OODJ and Concurrent Programming through system modelling, thread-based logic, and disciplined software architecture.",
    meaning: "A language that supports disciplined design, strong abstraction, and both object-oriented and concurrent system development.",
    direction: "OODJ · Concurrent Programming · structured application design",
    projects: [
      {
        name: "OODJ Medical System",
        summary: "Java supports object-oriented modelling, real-world process mapping, and class-based software structure through OODJ-focused development.",
        tech: "Java",
        github: "Available upon request",
        thumb: "Object-Oriented Design · Real-World Modelling · Class Structure",
        features: [
          "Strong support for OODJ principles",
          "Encourages reusable class-based design",
          "Useful for structured software modelling"
        ]
      },
      {
        name: "Concurrent Programming System",
        summary: "Java is also used in Concurrent Programming to model threads, coordination logic, and safer multi-threaded system behaviour.",
        tech: "Java · Threads · Concurrency",
        github: "Available upon request",
        thumb: "Thread Logic · Synchronisation · Concurrent Systems",
        features: [
          "Supports concurrent and multi-threaded logic",
          "Useful for thread coordination and system safety",
          "Builds understanding of structured concurrency"
        ]
      }
    ]
  },

  python: {
    name: "Python",
    icon: iconHtml.python,
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
          "Useful for scripting and automation",
          "Strong readability for structured development",
          "Well suited for flexible technical workflows"
        ]
      }
    ]
  },

  javascript: {
    name: "JavaScript",
    icon: iconHtml.javascript,
    description: "JavaScript represents movement, interactivity, responsiveness, and the behaviour layer that turns static structure into dynamic digital experience.",
    meaning: "A language that connects interface, motion, and real-time user interaction.",
    direction: "Interaction · behaviour · dynamic interfaces",
    projects: [
      {
        name: "Interactive Website Behaviour",
        summary: "JavaScript powers motion, orbit interaction, responsive content updates, and the living behaviour of this portfolio interface.",
        tech: "JavaScript",
        github: "Available upon request",
        thumb: "Interaction · Motion · Behaviour Logic",
        features: [
          "Enables dynamic interface updates",
          "Supports interactive user experience",
          "Brings front-end systems into motion"
        ]
      }
    ]
  },

  r: {
    name: "R",
    icon: iconHtml.r,
    description: "R represents analytical modelling, statistical reasoning, and the ability to interpret data through a more evidence-driven technical lens.",
    meaning: "A technology aligned with deeper analysis, modelling logic, and insight generation.",
    direction: "Statistical analysis · modelling · insight generation",
    projects: [
      {
        name: "Analytical Exploration",
        summary: "R reflects a growing direction toward data analysis and stronger technical interpretation of patterns and outcomes.",
        tech: "R",
        github: "Available upon request",
        thumb: "Statistics · Analysis · Insight",
        features: [
          "Supports statistical and analytical work",
          "Useful for model interpretation",
          "Strengthens evidence-based analysis"
        ]
      }
    ]
  },

  sql: {
    name: "SQL",
    icon: iconHtml.sql,
    description: "SQL represents structured data logic, query thinking, and the relational architecture required to organise information meaningfully.",
    meaning: "A core technology for systems that depend on clarity, relationships, and reliable data retrieval.",
    direction: "Relational data · query logic · structured systems",
    projects: [
      {
        name: "MyGoPandai Data Foundation",
        summary: "SQL supports relational database work, query-based data access, and the logical structure behind application-level information systems.",
        tech: "SQL · SQL Server",
        github: "Available upon request",
        thumb: "Query Logic · Database Structure · Information Modelling",
        features: [
          "Supports relational data handling",
          "Useful for schema and query thinking",
          "Critical for data-driven application logic"
        ]
      }
    ]
  },

  html5: {
    name: "HTML5",
    icon: iconHtml.html5,
    description: "HTML5 represents semantic structure, page hierarchy, and the foundational architecture of public-facing web experiences.",
    meaning: "The layer where content becomes clearly structured, navigable, and presentation-ready on the web.",
    direction: "Semantic structure · page architecture · web foundation",
    projects: [
      {
        name: "Personal Brand Website",
        summary: "HTML5 shapes the structural foundation of this portfolio through content hierarchy, semantic layout, and organised page flow.",
        tech: "HTML5",
        github: "Available upon request",
        thumb: "Structure · Hierarchy · Semantic Web Foundation",
        features: [
          "Supports semantic and structured content",
          "Improves page organisation and clarity",
          "Forms the base of web presentation"
        ]
      }
    ]
  },

  sas: {
    name: "SAS",
    icon: iconHtml.sas,
    description: "SAS represents analytical workflow, predictive thinking, and an applied approach to structured data modelling in a business-oriented context.",
    meaning: "A toolset connected to predictive modelling, analytics workflow, and practical data-driven insight.",
    direction: "Predictive modelling · business analytics · data workflows",
    projects: [
      {
        name: "Data Modelling Direction",
        summary: "SAS reflects interest in applied analytics, structured modelling workflows, and the interpretation of predictive results in technical contexts.",
        tech: "SAS",
        github: "Available upon request",
        thumb: "Analytics · Modelling · Applied Data Thinking",
        features: [
          "Supports predictive and analytical workflows",
          "Useful for business-oriented modelling",
          "Builds structured data interpretation capability"
        ]
      }
    ]
  }
};

const orbitNodes = document.getElementById("orbitNodes");
const orbitShell = document.getElementById("orbitShell");

const skillIconImage = document.getElementById("skillIconImage");
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

let orbitRotation = 0;
let isDragging = false;
let startX = 0;
let startRotation = 0;
let currentSkillKey = "mysql";
let velocity = 0;
let inertiaFrame = null;
let autoRotateFrame = null;
let isPausedByInteraction = false;
let autoRotateTimeout = null;

function updateOrbitRotation() {
  orbitShell.style.setProperty("--orbit-rotation", `${orbitRotation}deg`);
}

function createOrbitNodes() {
  orbitNodes.innerHTML = "";

  techOrder.forEach((item) => {
    const button = document.createElement("button");
    button.className = "orbit-skill";
    button.dataset.skill = item.key;
    button.dataset.ring = String(item.ring);
    button.type = "button";
    button.setAttribute("aria-label", item.label);
    button.title = item.label;

    button.style.setProperty("--angle", `${item.angle}deg`);
    button.style.setProperty("--radius", `${item.radius}px`);

    button.innerHTML = `
      <div class="orbit-logo-wrap">${skills[item.key].icon}</div>
      <span class="orbit-node-label">${item.label}</span>
    `;

    button.addEventListener("click", () => {
      setActiveSkill(item.key);
      pauseAutoRotateTemporarily();
    });

    orbitNodes.appendChild(button);
  });
}

function renderProjectDetail(project) {
  projectName.textContent = project.name;
  projectSummary.textContent = project.summary;
  projectTech.textContent = project.tech;

  if (project.github && project.github !== "Available upon request") {
    projectGithub.innerHTML = `<a href="${project.github}" target="_blank" rel="noopener noreferrer">${project.github}</a>`;
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

  currentSkillKey = skillKey;

  skillIconImage.innerHTML = skill.icon;
  skillName.textContent = skill.name;
  skillDescription.textContent = skill.description;
  skillMeaning.textContent = skill.meaning;
  skillDirection.textContent = skill.direction;

  projectList.innerHTML = "";

  skill.projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-preview-card";
    if (index === 0) card.classList.add("active");

    card.innerHTML = `
      <strong>${project.name}</strong>
      <p>${project.summary}</p>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".project-preview-card").forEach((item) => {
        item.classList.remove("active");
      });

      card.classList.add("active");
      renderProjectDetail(project);
    });

    projectList.appendChild(card);

    if (index === 0) {
      renderProjectDetail(project);
    }
  });
}

function setActiveSkill(skillKey) {
  document.querySelectorAll(".orbit-skill").forEach((button) => {
    button.classList.toggle("active", button.dataset.skill === skillKey);
  });

  renderSkill(skillKey);
}

function stopInertia() {
  if (inertiaFrame) {
    cancelAnimationFrame(inertiaFrame);
    inertiaFrame = null;
  }
}

function startInertia() {
  stopInertia();

  const step = () => {
    velocity *= 0.95;

    if (Math.abs(velocity) < 0.02) {
      velocity = 0;
      inertiaFrame = null;
      return;
    }

    orbitRotation += velocity;
    updateOrbitRotation();
    inertiaFrame = requestAnimationFrame(step);
  };

  inertiaFrame = requestAnimationFrame(step);
}

function startAutoRotate() {
  if (autoRotateFrame) {
    cancelAnimationFrame(autoRotateFrame);
  }

  const loop = () => {
    if (!isDragging && !isPausedByInteraction && Math.abs(velocity) < 0.02) {
      orbitRotation += 0.08;
      updateOrbitRotation();
    }

    autoRotateFrame = requestAnimationFrame(loop);
  };

  autoRotateFrame = requestAnimationFrame(loop);
}

function pauseAutoRotateTemporarily() {
  isPausedByInteraction = true;

  if (autoRotateTimeout) {
    clearTimeout(autoRotateTimeout);
  }

  autoRotateTimeout = setTimeout(() => {
    isPausedByInteraction = false;
  }, 1800);
}

function startDrag(clientX) {
  stopInertia();
  isDragging = true;
  isPausedByInteraction = true;
  startX = clientX;
  startRotation = orbitRotation;
  orbitShell.classList.add("dragging");
}

function moveDrag(clientX) {
  if (!isDragging) return;

  const delta = clientX - startX;
  const nextRotation = startRotation + delta * 0.55;
  velocity = nextRotation - orbitRotation;
  orbitRotation = nextRotation;
  updateOrbitRotation();
}

function endDrag() {
  if (!isDragging) return;

  isDragging = false;
  orbitShell.classList.remove("dragging");
  startInertia();
  pauseAutoRotateTemporarily();
}

orbitShell.addEventListener("mousedown", (event) => {
  startDrag(event.clientX);
});

window.addEventListener("mousemove", (event) => {
  moveDrag(event.clientX);
});

window.addEventListener("mouseup", () => {
  endDrag();
});

orbitShell.addEventListener(
  "touchstart",
  (event) => {
    if (!event.touches.length) return;
    startDrag(event.touches[0].clientX);
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    if (!event.touches.length) return;
    moveDrag(event.touches[0].clientX);
  },
  { passive: true }
);

window.addEventListener("touchend", () => {
  endDrag();
});

createOrbitNodes();
updateOrbitRotation();
setActiveSkill(currentSkillKey);
startAutoRotate();