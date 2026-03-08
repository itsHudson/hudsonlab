export function InitializeRevealEffects() {
    const RevealElements = document.querySelectorAll(".reveal");

    const RevealObserver = new IntersectionObserver((ObserverEntries) => {
        ObserverEntries.forEach((CurrentEntry) => {
            if (CurrentEntry.isIntersecting) {
                CurrentEntry.target.classList.add("show");

                if (CurrentEntry.target.classList.contains("skill-card")) {
                    const SkillProgressBar = CurrentEntry.target.querySelector(".skill-progress");

                    if (SkillProgressBar) {
                        const TargetWidth = SkillProgressBar.getAttribute("data-width");
                        SkillProgressBar.style.width = TargetWidth;
                    }
                }
            }
        });
    }, {
        threshold: 0.15
    });

    RevealElements.forEach((CurrentElement) => {
        RevealObserver.observe(CurrentElement);
    });
}
