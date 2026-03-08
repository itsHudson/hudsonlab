function SetupScrollUtilities() {
    const BackToTopButton = document.getElementById("BackToTop");
    const ScrollProgressBar = document.getElementById("ScrollProgress");

    function UpdateBackToTopButton() {
        if (!BackToTopButton) {
            return;
        }

        if (window.scrollY > 400) {
            BackToTopButton.classList.add("show");
        } else {
            BackToTopButton.classList.remove("show");
        }
    }

    function UpdateProgressBar() {
        if (!ScrollProgressBar) {
            return;
        }

        const ScrollTopValue = document.documentElement.scrollTop || document.body.scrollTop;
        const ScrollHeightValue = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const ProgressWidthValue = ScrollHeightValue > 0 ? (ScrollTopValue / ScrollHeightValue) * 100 : 0;
        ScrollProgressBar.style.width = `${ProgressWidthValue}%`;
    }

    if (BackToTopButton) {
        BackToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    window.addEventListener("scroll", UpdateBackToTopButton);
    window.addEventListener("scroll", UpdateProgressBar);
    window.addEventListener("load", UpdateProgressBar);

    UpdateBackToTopButton();
    UpdateProgressBar();
}

document.addEventListener("AllComponentsLoaded", SetupScrollUtilities);
