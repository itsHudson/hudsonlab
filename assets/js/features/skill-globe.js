const SkillDataMap = {
    python: {
        MiniTitle: "Selected Skill",
        Title: "Python",
        Description: "Used for scripting, logic development, and academic systems with clean structure.",
        TagList: ["Scripting", "File Handling", "Academic Systems"],
        ProjectList: [
            { Name: "Classroom Management System", Description: "Manages attendance, schedules, and student records using modular design and file handling." }
        ]
    },
    java: {
        MiniTitle: "Selected Skill",
        Title: "Java",
        Description: "Applied in object-oriented programming and structured application development.",
        TagList: ["OOP", "Application Logic", "System Structure"],
        ProjectList: [
            { Name: "APU Medical Centre System", Description: "Simulates patient records, appointment handling, and billing with Java OOP concepts." }
        ]
    },
    c_cpp: {
        MiniTitle: "Selected Skill",
        Title: "C / C++",
        Description: "Used for programming fundamentals, system logic, and algorithm practice.",
        TagList: ["Logic", "Algorithms", "Structured Programming"],
        ProjectList: [
            { Name: "Bus Reservation System", Description: "Simulates booking, cancellation, and reporting with structured programming logic." }
        ]
    },
    sql: {
        MiniTitle: "Selected Skill",
        Title: "SQL / DBMS",
        Description: "Used to manage queries, relational design, and structured data handling.",
        TagList: ["Queries", "Relational Design", "Structured Data"],
        ProjectList: [
            { Name: "Medical Centre Data Structure", Description: "Supports patient record storage and retrieval using database thinking." }
        ]
    },
    htmlcss: {
        MiniTitle: "Selected Skill",
        Title: "HTML / CSS",
        Description: "Used to build clean interfaces, layouts, responsive sections, and portfolio designs.",
        TagList: ["Responsive Layout", "UI Design", "Portfolio Pages"],
        ProjectList: [
            { Name: "Professional Portfolio Website", Description: "Creates clean page sections, reusable layouts, and modern visual styling." }
        ]
    },
    analytics: {
        MiniTitle: "Selected Skill",
        Title: "Analytics Tools",
        Description: "Supports interpretation, data exploration, and better decision making in academic work.",
        TagList: ["Analysis", "Reporting", "Insight"],
        ProjectList: [
            { Name: "Data Analytics Coursework", Description: "Strengthens analysis thinking, reporting, and pattern interpretation skills." }
        ]
    }
};

function RenderSkillDetail(SkillKeyValue) {
    const SkillDataObject = SkillDataMap[SkillKeyValue];
    if (!SkillDataObject) {
        return;
    }

    const SkillMiniTitleElement = document.getElementById("SkillMiniTitle");
    const SkillTitleElement = document.getElementById("SkillTitle");
    const SkillDescriptionElement = document.getElementById("SkillDescription");
    const SkillTagListElement = document.getElementById("SkillTagList");
    const SkillProjectListElement = document.getElementById("SkillProjectList");

    if (SkillMiniTitleElement) SkillMiniTitleElement.textContent = SkillDataObject.MiniTitle;
    if (SkillTitleElement) SkillTitleElement.textContent = SkillDataObject.Title;
    if (SkillDescriptionElement) SkillDescriptionElement.textContent = SkillDataObject.Description;

    if (SkillTagListElement) {
        SkillTagListElement.innerHTML = SkillDataObject.TagList
            .map((CurrentTag) => `<span>${CurrentTag}</span>`)
            .join("");
    }

    if (SkillProjectListElement) {
        SkillProjectListElement.innerHTML = SkillDataObject.ProjectList
            .map((CurrentProject) => `
                <div class="skill-related-project-card">
                    <h5>${CurrentProject.Name}</h5>
                    <p>${CurrentProject.Description}</p>
                </div>
            `)
            .join("");
    }
}

function SetupSkillGlobe() {
    const SkillButtonList = document.querySelectorAll(".skill-icon-button");
    SkillButtonList.forEach((CurrentSkillButton) => {
        CurrentSkillButton.addEventListener("click", () => {
            SkillButtonList.forEach((OtherButton) => {
                OtherButton.classList.remove("is-active");
            });

            CurrentSkillButton.classList.add("is-active");
            const SkillKeyValue = CurrentSkillButton.getAttribute("data-skill-key");
            RenderSkillDetail(SkillKeyValue);
        });
    });

    RenderSkillDetail("python");
}

document.addEventListener("AllComponentsLoaded", SetupSkillGlobe);
