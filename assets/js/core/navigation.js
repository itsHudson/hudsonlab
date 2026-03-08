export function InitializeMobileMenu() {
    const MenuToggleButton = document.getElementById("MenuToggle");
    const MainNavigation = document.getElementById("MainNav");

    if (!MenuToggleButton || !MainNavigation) {
        return;
    }

    MenuToggleButton.addEventListener("click", () => {
        MainNavigation.classList.toggle("show");
    });

    const NavigationLinks = MainNavigation.querySelectorAll("a");

    NavigationLinks.forEach((CurrentLink) => {
        CurrentLink.addEventListener("click", () => {
            MainNavigation.classList.remove("show");
        });
    });
}

export function InitializeActiveNavigation() {
    const AllSections = document.querySelectorAll("section[id]");
    const NavigationLinks = document.querySelectorAll(".main-nav a");

    function UpdateActiveNavigation() {
        let CurrentSectionId = "";

        AllSections.forEach((CurrentSection) => {
            const SectionTopPosition = CurrentSection.offsetTop - 140;
            const SectionHeight = CurrentSection.offsetHeight;

            if (window.scrollY >= SectionTopPosition && window.scrollY < SectionTopPosition + SectionHeight) {
                CurrentSectionId = CurrentSection.getAttribute("id") || "";
            }
        });

        NavigationLinks.forEach((CurrentLink) => {
            CurrentLink.classList.remove("active");

            if (CurrentLink.getAttribute("href") === `#${CurrentSectionId}`) {
                CurrentLink.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", UpdateActiveNavigation);
    UpdateActiveNavigation();
}
