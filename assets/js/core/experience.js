function SetupExperienceAccordion() {
    const ExperienceItemList = document.querySelectorAll(".experience-item");

    ExperienceItemList.forEach((CurrentItem) => {
        const SummaryButton = CurrentItem.querySelector(".experience-summary");
        const DetailBox = CurrentItem.querySelector(".experience-details");

        if (CurrentItem.classList.contains("active") && DetailBox) {
            DetailBox.style.maxHeight = `${DetailBox.scrollHeight}px`;
        }

        if (SummaryButton && DetailBox) {
            SummaryButton.addEventListener("click", () => {
                const IsCurrentItemActive = CurrentItem.classList.contains("active");

                ExperienceItemList.forEach((OtherItem) => {
                    const OtherDetailBox = OtherItem.querySelector(".experience-details");
                    OtherItem.classList.remove("active");
                    if (OtherDetailBox) {
                        OtherDetailBox.style.maxHeight = null;
                    }
                });

                if (!IsCurrentItemActive) {
                    CurrentItem.classList.add("active");
                    DetailBox.style.maxHeight = `${DetailBox.scrollHeight}px`;
                }
            });
        }
    });

    window.addEventListener("resize", () => {
        ExperienceItemList.forEach((CurrentItem) => {
            const DetailBox = CurrentItem.querySelector(".experience-details");
            if (CurrentItem.classList.contains("active") && DetailBox) {
                DetailBox.style.maxHeight = `${DetailBox.scrollHeight}px`;
            }
        });
    });
}

document.addEventListener("AllComponentsLoaded", SetupExperienceAccordion);
