export function InitializeExperienceAccordion() {
    const ExperienceItems = document.querySelectorAll(".experience-item");

    ExperienceItems.forEach((CurrentItem) => {
        const SummaryButton = CurrentItem.querySelector(".experience-summary");
        const DetailArea = CurrentItem.querySelector(".experience-details");

        if (CurrentItem.classList.contains("active") && DetailArea) {
            DetailArea.style.maxHeight = `${DetailArea.scrollHeight}px`;
        }

        if (!SummaryButton || !DetailArea) {
            return;
        }

        SummaryButton.addEventListener("click", () => {
            const IsCurrentItemOpen = CurrentItem.classList.contains("active");

            ExperienceItems.forEach((OtherItem) => {
                const OtherDetailArea = OtherItem.querySelector(".experience-details");
                OtherItem.classList.remove("active");

                if (OtherDetailArea) {
                    OtherDetailArea.style.maxHeight = null;
                }
            });

            if (!IsCurrentItemOpen) {
                CurrentItem.classList.add("active");
                DetailArea.style.maxHeight = `${DetailArea.scrollHeight}px`;
            }
        });
    });

    window.addEventListener("resize", () => {
        ExperienceItems.forEach((CurrentItem) => {
            const DetailArea = CurrentItem.querySelector(".experience-details");

            if (CurrentItem.classList.contains("active") && DetailArea) {
                DetailArea.style.maxHeight = `${DetailArea.scrollHeight}px`;
            }
        });
    });
}
