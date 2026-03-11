const iconHtml = {
  mysql: '<img src="../Images/TE_MySQL.png" alt="MySQL">',
  sqlserver: '<img src="../Images/TE_SQLServer.png" alt="Microsoft SQL Server">',
  ubuntu: '<img src="../Images/TE_Ubuntu.png" alt="Ubuntu">',
  rocky: '<img src="../Images/TE_Rocky.png" alt="Rocky Linux">',

  visualstudio: '<img src="../Images/TE_VisualStudio.png" alt="Visual Studio">',
  vscode: '<img src="../Images/TE_VisualStudioCode.png" alt="Visual Studio Code">',
  netbeans: '<img src="../Images/TE_ApacheNetbeans.png" alt="Apache NetBeans">',
  codeblocks: '<img src="../Images/TE_CodeBlock.png" alt="Code::Blocks">',
  git: '<img src="../Images/TE_Git.png" alt="Git">',
  github: '<img src="../Images/TE_GitHub.png" alt="GitHub">',
  aspnet: '<img src="../Images/TE_ASP.NET.png" alt="ASP.NET">',
  figma: '<img src="../Images/TE_Figma.png" alt="Figma">',
  slack: '<img src="../Images/TE_Slack.png" alt="Slack">',

  assembly: '<img src="../Images/TE_Assembly.png" alt="Assembly">',
  c: '<img src="../Images/TE_C.png" alt="C">',
  cpp: '<img src="../Images/TE_C%2B%2B.png" alt="C++">',
  csharp: '<img src="../Images/TE_C%23.png" alt="C#">',
  css3: '<img src="../Images/TE_CSS3.png" alt="CSS3">',
  java: '<img src="../Images/TE_Java.png" alt="Java">',
  javascript: '<img src="../Images/TE_JavaScript.png" alt="JavaScript">',
  python: '<img src="../Images/TE_Python.png" alt="Python">',
  r: '<img src="../Images/TE_R.png" alt="R">',
  html5: '<img src="../Images/TE_HTML5.png" alt="HTML5">',
  sas: '<img src="../Images/TE_SAS.png" alt="SAS">'
};

const techOrder = [
  { key: "mysql", ring: 1, angle: 0, radius: 102, label: "MySQL" },
  { key: "sqlserver", ring: 1, angle: 180, radius: 102, label: "SQL Server" },

  { key: "ubuntu", ring: 2, angle: 45, radius: 155, label: "Ubuntu" },
  { key: "rocky", ring: 2, angle: 225, radius: 155, label: "Rocky Linux" },

  { key: "visualstudio", ring: 3, angle: 0, radius: 245, label: "Visual Studio" },
  { key: "vscode", ring: 3, angle: 40, radius: 245, label: "VS Code" },
  { key: "netbeans", ring: 3, angle: 80, radius: 245, label: "NetBeans" },
  { key: "codeblocks", ring: 3, angle: 120, radius: 245, label: "Code::Blocks" },
  { key: "git", ring: 3, angle: 160, radius: 245, label: "Git" },
  { key: "github", ring: 3, angle: 200, radius: 245, label: "GitHub" },
  { key: "aspnet", ring: 3, angle: 240, radius: 245, label: "ASP.NET" },
  { key: "figma", ring: 3, angle: 280, radius: 245, label: "Figma" },
  { key: "slack", ring: 3, angle: 320, radius: 245, label: "Slack" },

  { key: "assembly", ring: 4, angle: 0, radius: 330, label: "Assembly" },
  { key: "c", ring: 4, angle: 32.72, radius: 330, label: "C" },
  { key: "cpp", ring: 4, angle: 65.45, radius: 330, label: "C++" },
  { key: "csharp", ring: 4, angle: 98.18, radius: 330, label: "C#" },
  { key: "css3", ring: 4, angle: 130.90, radius: 330, label: "CSS3" },
  { key: "java", ring: 4, angle: 163.63, radius: 330, label: "Java" },
  { key: "javascript", ring: 4, angle: 196.36, radius: 330, label: "JavaScript" },
  { key: "python", ring: 4, angle: 229.09, radius: 330, label: "Python" },
  { key: "r", ring: 4, angle: 261.81, radius: 330, label: "R" },
  { key: "html5", ring: 4, angle: 294.54, radius: 330, label: "HTML5" },
  { key: "sas", ring: 4, angle: 327.27, radius: 330, label: "SAS" }
];

const skillMeta = {
  mysql: { layer: "Data Layer", relatedSummary: "SQL Server · ASP.NET" },
  sqlserver: { layer: "Data Layer", relatedSummary: "MySQL · ASP.NET · C#" },
  ubuntu: { layer: "Environment", relatedSummary: "Rocky Linux · Python · Git · GitHub" },
  rocky: { layer: "Environment", relatedSummary: "Ubuntu · Python · Git" },
  visualstudio: { layer: "Workflow Layer", relatedSummary: "ASP.NET · C# · SQL Server" },
  vscode: { layer: "Workflow Layer", relatedSummary: "HTML5 · CSS3 · JavaScript" },
  netbeans: { layer: "Workflow Layer", relatedSummary: "Java" },
  codeblocks: { layer: "Workflow Layer", relatedSummary: "C · C++" },
  git: { layer: "Workflow Layer", relatedSummary: "GitHub · VS Code · Visual Studio" },
  github: { layer: "Workflow Layer", relatedSummary: "Git · VS Code" },
  aspnet: { layer: "Workflow Layer", relatedSummary: "Visual Studio · C# · SQL Server" },
  figma: { layer: "Workflow Layer", relatedSummary: "HTML5 · CSS3 · JavaScript" },
  slack: { layer: "Workflow Layer", relatedSummary: "GitHub · Figma" },
  assembly: { layer: "Language Layer", relatedSummary: "C" },
  c: { layer: "Language Layer", relatedSummary: "C++ · Code::Blocks · Assembly" },
  cpp: { layer: "Language Layer", relatedSummary: "C · Code::Blocks" },
  csharp: { layer: "Language Layer", relatedSummary: "Visual Studio · ASP.NET · SQL Server" },
  css3: { layer: "Language Layer", relatedSummary: "HTML5 · JavaScript · Figma" },
  java: { layer: "Language Layer", relatedSummary: "NetBeans" },
  javascript: { layer: "Language Layer", relatedSummary: "HTML5 · CSS3 · VS Code" },
  python: { layer: "Language Layer", relatedSummary: "Ubuntu · Rocky Linux · VS Code" },
  r: { layer: "Language Layer", relatedSummary: "SAS" },
  html5: { layer: "Language Layer", relatedSummary: "CSS3 · JavaScript · Figma" },
  sas: { layer: "Language Layer", relatedSummary: "R" }
};

const overviewState = {
  name: "Technology Overview",
  description: "Click any technology inside the compass to inspect its role, direction, and connected project perspective.",
  meaning: "A curated technical ecosystem that groups tools, environments, and languages into a more visual system view.",
  direction: "Exploration · systems thinking · technical presentation",
  layer: "Overview Mode",
  relatedSummary: "Select a logo to inspect details",
  projectName: "Project Details",
  projectSummary: "Select a technology from the compass to view its related project direction.",
  projectTech: "-",
  projectGithub: "-",
  projectThumb: "Technology preview area",
  projectFeatures: [
    "Click a logo to enter focus mode",
    "Click empty space to return to overview mode",
    "Explore the ecosystem as a visual technical map"
  ]
};

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

  ubuntu: {
    name: "Ubuntu",
    icon: iconHtml.ubuntu,
    description: "Ubuntu represents environment awareness, command-line confidence, and stronger understanding of how software interacts with real execution systems.",
    meaning: "An environment that reflects platform understanding, workflow discipline, and technical familiarity beyond application-only development.",
    direction: "Operating systems · terminal workflow · environment understanding",
    projects: [
      {
        name: "System Environment Direction",
        summary: "Ubuntu supports stronger familiarity with development environments, processes, and system-level workflow behaviour.",
        tech: "Ubuntu",
        github: "Available upon request",
        thumb: "Environment Awareness · Terminal Workflow · Platform Thinking",
        features: [
          "Builds stronger command-line confidence",
          "Supports system-level technical familiarity",
          "Strengthens development environment awareness"
        ]
      }
    ]
  },

  rocky: {
    name: "Rocky Linux",
    icon: iconHtml.rocky,
    description: "Rocky Linux represents enterprise-oriented Linux system knowledge and server-side platform awareness.",
    meaning: "It reflects familiarity with enterprise Linux environments and system stability used in production infrastructures.",
    direction: "Linux systems · server environments · infrastructure platform",
    projects: [
      {
        name: "Enterprise Linux Environment",
        summary: "Rocky Linux reflects understanding of enterprise Linux platforms used for backend services and stable server environments.",
        tech: "Rocky Linux",
        github: "Available upon request",
        thumb: "Enterprise Linux · System Stability · Server Environment",
        features: [
          "Enterprise-grade Linux distribution",
          "Stable backend server environment",
          "Platform-level infrastructure awareness"
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

  figma: {
    name: "Figma",
    icon: iconHtml.figma,
    description: "Figma represents interface planning, layout thinking, and the visual design process behind cleaner digital product experiences.",
    meaning: "A collaborative design environment for shaping interface ideas before implementation.",
    direction: "UI planning · layout design · collaborative prototyping",
    projects: [
      {
        name: "Interface Concept Direction",
        summary: "Figma supports the visual planning stage of interface thinking, helping organise layout, spacing, and hierarchy before development.",
        tech: "Figma",
        github: "Available upon request",
        thumb: "UI Planning · Prototyping · Visual Structure",
        features: [
          "Supports interface ideation and layout planning",
          "Useful for cleaner visual hierarchy decisions",
          "Helps bridge design thinking and development"
        ]
      }
    ]
  },

  slack: {
    name: "Slack",
    icon: iconHtml.slack,
    description: "Slack represents communication flow, collaboration, and the coordination layer often needed around technical and project-based work.",
    meaning: "A collaborative platform that supports teamwork, updates, and communication around ongoing development and delivery.",
    direction: "Team communication · coordination · collaborative workflow",
    projects: [
      {
        name: "Collaboration Workflow Support",
        summary: "Slack reflects the communication side of technical work, where progress, coordination, and team interaction help support delivery.",
        tech: "Slack",
        github: "Available upon request",
        thumb: "Collaboration · Updates · Team Coordination",
        features: [
          "Supports team communication and project flow",
          "Useful for collaborative technical environments",
          "Helps connect work, updates, and coordination"
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

  css3: {
    name: "CSS3",
    icon: iconHtml.css3,
    description: "CSS3 represents visual identity, layout rhythm, spacing control, and the design system layer that shapes interface atmosphere.",
    meaning: "The language of presentation, hierarchy, motion, and premium visual communication on the web.",
    direction: "Design systems · interface styling · visual language",
    projects: [
      {
        name: "HUDSONLAB Interface Design",
        summary: "CSS3 gives structure, branding, premium spacing, responsive design, and polished motion to the overall digital experience.",
        tech: "CSS3",
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
const particleLayer = document.getElementById("particleLayer");
const coreLabel = document.getElementById("coreLabel");
const orbitCore = document.getElementById("orbitCore");

const skillIconImage = document.getElementById("skillIconImage");
const skillName = document.getElementById("skillName");
const skillDescription = document.getElementById("skillDescription");
const skillMeaning = document.getElementById("skillMeaning");
const skillDirection = document.getElementById("skillDirection");
const skillLayer = document.getElementById("skillLayer");
const skillRelatedSummary = document.getElementById("skillRelatedSummary");
const projectList = document.getElementById("projectList");
const projectName = document.getElementById("projectName");
const projectSummary = document.getElementById("projectSummary");
const projectTech = document.getElementById("projectTech");
const projectGithub = document.getElementById("projectGithub");
const projectFeatures = document.getElementById("projectFeatures");
const projectThumbPreview = document.getElementById("projectThumbPreview");

const ringRotation = {
  1: 0,
  2: 0,
  3: 0,
  4: 0
};

const ringSpeed = {
  1: 0.035,
  2: 0.06,
  3: 0.11,
  4: -0.028
};

const particles = [
  { id: "p1", ring: 1, angle: 18, radius: 105, speed: 0.12, active: true },
  { id: "p2", ring: 2, angle: 120, radius: 170, speed: 0.05, active: false },
  { id: "p3", ring: 3, angle: 245, radius: 250, speed: 0.085, active: false },
  { id: "p4", ring: 4, angle: 300, radius: 335, speed: -0.04, active: false }
];

let isDragging = false;
let startX = 0;
let startRing3Rotation = 0;
let currentSkillKey = null;
let velocity = 0;
let inertiaFrame = null;
let autoRotateFrame = null;
let isPausedByInteraction = false;
let autoRotateTimeout = null;

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
    button.style.setProperty("--ring-rotation", `${ringRotation[item.ring]}deg`);

    button.innerHTML = `
      <div class="orbit-logo-wrap">
        <span class="orbit-halo"></span>
        ${skills[item.key].icon}
      </div>
      <span class="orbit-node-label">${item.label}</span>
    `;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setActiveSkill(item.key);
      pauseAutoRotateTemporarily();
    });

    orbitNodes.appendChild(button);
  });
}

function createParticles() {
  particleLayer.innerHTML = "";

  particles.forEach((particle) => {
    const dot = document.createElement("span");
    dot.className = particle.active ? "orbit-particle active-particle" : "orbit-particle";
    dot.dataset.id = particle.id;
    dot.dataset.ring = String(particle.ring);
    dot.style.setProperty("--angle", `${particle.angle}deg`);
    dot.style.setProperty("--radius", `${particle.radius}px`);
    dot.style.setProperty("--ring-rotation", `${ringRotation[particle.ring]}deg`);
    particleLayer.appendChild(dot);
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

function renderOverviewState() {
  skillIconImage.innerHTML = "";
  skillName.textContent = overviewState.name;
  skillDescription.textContent = overviewState.description;
  skillMeaning.textContent = overviewState.meaning;
  skillDirection.textContent = overviewState.direction;
  skillLayer.textContent = overviewState.layer;
  skillRelatedSummary.textContent = overviewState.relatedSummary;

  projectList.innerHTML = `
    <div class="project-preview-card active">
      <strong>Interactive Exploration</strong>
      <p>
        Choose a technology from the compass to reveal its meaning, direction,
        and project/application layer.
      </p>
    </div>
  `;

  projectName.textContent = overviewState.projectName;
  projectSummary.textContent = overviewState.projectSummary;
  projectTech.textContent = overviewState.projectTech;
  projectGithub.textContent = overviewState.projectGithub;
  projectThumbPreview.textContent = overviewState.projectThumb;

  projectFeatures.innerHTML = "";
  overviewState.projectFeatures.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    projectFeatures.appendChild(li);
  });

  coreLabel.textContent = "TECH";
}

function renderSkill(skillKey) {
  const skill = skills[skillKey];
  const meta = skillMeta[skillKey];
  if (!skill || !meta) return;

  skillIconImage.innerHTML = skill.icon;
  skillName.textContent = skill.name;
  skillDescription.textContent = skill.description;
  skillMeaning.textContent = skill.meaning;
  skillDirection.textContent = skill.direction;
  skillLayer.textContent = meta.layer;
  skillRelatedSummary.textContent = meta.relatedSummary;
  coreLabel.textContent = meta.layer.replace(" Layer", "").toUpperCase();

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

function updateNodeFocus() {
  const buttons = document.querySelectorAll(".orbit-skill");

  buttons.forEach((button) => {
    const isActive = currentSkillKey !== null && button.dataset.skill === currentSkillKey;
    button.classList.toggle("active", isActive);
  });

  orbitShell.classList.toggle("focus-mode", currentSkillKey !== null);
}

function applyRingRotations() {
  document.querySelectorAll(".orbit-skill").forEach((node) => {
    const ring = node.dataset.ring;
    node.style.setProperty("--ring-rotation", `${ringRotation[ring]}deg`);
  });

  document.querySelectorAll(".orbit-particle").forEach((particle) => {
    const ring = particle.dataset.ring;
    particle.style.setProperty("--ring-rotation", `${ringRotation[ring]}deg`);
  });
}

function stepParticles() {
  particles.forEach((particle) => {
    particle.angle += particle.speed;
    const el = particleLayer.querySelector(`[data-id="${particle.id}"]`);
    if (el) {
      el.style.setProperty("--angle", `${particle.angle}deg`);
    }
  });
}

function setActiveSkill(skillKey) {
  currentSkillKey = skillKey;
  renderSkill(skillKey);
  updateNodeFocus();
}

function clearActiveSkill() {
  currentSkillKey = null;
  renderOverviewState();
  updateNodeFocus();
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
    velocity *= 0.94;

    if (Math.abs(velocity) < 0.02) {
      velocity = 0;
      inertiaFrame = null;
      return;
    }

    ringRotation[3] += velocity;
    applyRingRotations();
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
      ringRotation[1] += ringSpeed[1];
      ringRotation[2] += ringSpeed[2];
      ringRotation[3] += ringSpeed[3];
      ringRotation[4] += ringSpeed[4];
    }

    applyRingRotations();
    stepParticles();

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
  startRing3Rotation = ringRotation[3];
  orbitShell.classList.add("dragging");
}

function moveDrag(clientX) {
  if (!isDragging) return;

  const delta = clientX - startX;
  const nextRotation = startRing3Rotation + delta * 0.55;
  velocity = nextRotation - ringRotation[3];

  ringRotation[3] = nextRotation;
  applyRingRotations();
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

orbitShell.addEventListener("click", (event) => {
  if (event.target.closest(".orbit-skill")) return;
  clearActiveSkill();
});

orbitCore.addEventListener("click", (event) => {
  event.stopPropagation();
  clearActiveSkill();
});

createOrbitNodes();
createParticles();
applyRingRotations();
renderOverviewState();
updateNodeFocus();
startAutoRotate();