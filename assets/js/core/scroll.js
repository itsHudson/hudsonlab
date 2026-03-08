export function InitializeBackToTopButton() {
    const BackToTopButton = document.getElementById("BackToTop");

    if (!BackToTopButton) {
        return;
    }

    function UpdateBackToTopButton() {
        if (window.scrollY > 400) {
            BackToTopButton.classList.add("show");
        } else {
            BackToTopButton.classList.remove("show");
        }
    }

    window.addEventListener("scroll", UpdateBackToTopButton);
    UpdateBackToTopButton();

    BackToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

export function InitializeScrollProgressBar() {
    const ScrollProgressBar = document.getElementById("ScrollProgress");

    if (!ScrollProgressBar) {
        return;
    }

    function UpdateScrollProgressBar() {
        const ScrollTopPosition = document.documentElement.scrollTop || document.body.scrollTop;
        const TotalScrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const ScrollPercentage = TotalScrollableHeight > 0 ? (ScrollTopPosition / TotalScrollableHeight) * 100 : 0;

        ScrollProgressBar.style.width = `${ScrollPercentage}%`;
    }

    window.addEventListener("scroll", UpdateScrollProgressBar);
    window.addEventListener("load", UpdateScrollProgressBar);
    UpdateScrollProgressBar();
}
