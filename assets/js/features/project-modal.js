const ProjectDataMap = {
    classroom: {
        Title: "Classroom Management System",
        Type: "Python Project",
        ImagePath: "assets/images/placeholders/project-classroom.svg",
        Description: "A Python-based academic system for managing attendance, records, and schedules through modular logic and file handling.",
        FeatureList: [
            "Attendance management workflow",
            "Student record management",
            "Schedule tracking",
            "Modular file structure"
        ],
        TechnologyList: ["Python", "File Handling", "Modular Design"],
        GithubLink: "#"
    },
    medical: {
        Title: "APU Medical Centre System",
        Type: "Java Project",
        ImagePath: "assets/images/placeholders/project-medical.svg",
        Description: "A Java OOP application that handles patient records, appointment management, and billing in a healthcare scenario.",
        FeatureList: [
            "Patient record workflow",
            "Appointment management",
            "Billing simulation",
            "Object-oriented structure"
        ],
        TechnologyList: ["Java", "OOP", "System Design"],
        GithubLink: "#"
    },
    bus: {
        Title: "Bus Reservation System",
        Type: "C Project",
        ImagePath: "assets/images/placeholders/project-bus.svg",
        Description: "A C programming project that simulates bus booking, cancellation, and reservation reporting using structured logic.",
        FeatureList: [
            "Booking process",
            "Cancellation process",
            "Reservation reporting",
            "Structured logic flow"
        ],
        TechnologyList: ["C", "Reservation Workflow", "Structured Logic"],
        GithubLink: "#"
    }
};

function OpenProjectModal(ProjectKeyValue) {
    const ModalElement = document.getElementById("ProjectModal");
    const ModalContentElement = document.getElementById("ProjectModalContent");
    const ProjectDataObject = ProjectDataMap[ProjectKeyValue];

    if (!ModalElement || !ModalContentElement || !ProjectDataObject) {
        return;
    }

    ModalContentElement.innerHTML = `
        <div class="project-modal-layout">
            <div class="project-modal-image">
                <img src="${ProjectDataObject.ImagePath}" alt="${ProjectDataObject.Title} preview">
            </div>
            <div class="project-modal-copy">
                <p class="section-kicker">${ProjectDataObject.Type}</p>
                <h3>${ProjectDataObject.Title}</h3>
                <p>${ProjectDataObject.Description}</p>
                <div class="tag-list">
                    ${ProjectDataObject.TechnologyList.map((CurrentTechnology) => `<span>${CurrentTechnology}</span>`).join("")}
                </div>
                <h4>Key Features</h4>
                <ul class="project-modal-list">
                    ${ProjectDataObject.FeatureList.map((CurrentFeature) => `<li>${CurrentFeature}</li>`).join("")}
                </ul>
                <div class="project-modal-actions">
                    <a href="${ProjectDataObject.GithubLink}" class="project-modal-button" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-github"></i>
                        Open Repository
                    </a>
                    <button class="project-modal-button secondary" data-close-modal="true">
                        <i class="fa-solid fa-xmark"></i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;

    ModalElement.classList.add("show");
    ModalElement.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function CloseProjectModal() {
    const ModalElement = document.getElementById("ProjectModal");
    if (!ModalElement) {
        return;
    }

    ModalElement.classList.remove("show");
    ModalElement.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function SetupProjectModal() {
    const OpenTriggerList = document.querySelectorAll(".project-modal-trigger");
    const CloseButton = document.getElementById("CloseProjectModal");
    const ModalElement = document.getElementById("ProjectModal");

    OpenTriggerList.forEach((CurrentTrigger) => {
        CurrentTrigger.addEventListener("click", () => {
            const ProjectKeyValue = CurrentTrigger.getAttribute("data-project-key");
            OpenProjectModal(ProjectKeyValue);
        });
    });

    if (CloseButton) {
        CloseButton.addEventListener("click", CloseProjectModal);
    }

    if (ModalElement) {
        ModalElement.addEventListener("click", (EventObject) => {
            const CloseTargetElement = EventObject.target.closest("[data-close-modal='true']");
            if (CloseTargetElement) {
                CloseProjectModal();
            }
        });
    }

    document.addEventListener("keydown", (EventObject) => {
        if (EventObject.key === "Escape") {
            CloseProjectModal();
        }
    });
}

document.addEventListener("AllComponentsLoaded", SetupProjectModal);
