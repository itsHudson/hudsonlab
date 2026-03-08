function SetupRevealAnimation() {
    const RevealElementList = document.querySelectorAll(".reveal");

    const RevealObserver = new IntersectionObserver((EntryList) => {
        EntryList.forEach((CurrentEntry) => {
            if (CurrentEntry.isIntersecting) {
                CurrentEntry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    RevealElementList.forEach((CurrentElement) => {
        RevealObserver.observe(CurrentElement);
    });
}

document.addEventListener("AllComponentsLoaded", SetupRevealAnimation);
