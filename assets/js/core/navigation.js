function SetupNavigation() {
    const MenuToggleButton = document.getElementById("MenuToggle");
    const MainNavigation = document.getElementById("MainNav");

    if (MenuToggleButton && MainNavigation) {
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

    const SectionList = document.querySelectorAll("section[id]");
    const NavigationLinkList = document.querySelectorAll(".main-nav a");

    function SetActiveNavigationLink() {
        let CurrentSectionId = "";

        SectionList.forEach((CurrentSection) => {
            const SectionTopPosition = CurrentSection.offsetTop - 140;
            const SectionHeightValue = CurrentSection.offsetHeight;

            if (window.scrollY >= SectionTopPosition && window.scrollY < SectionTopPosition + SectionHeightValue) {
                CurrentSectionId = CurrentSection.getAttribute("id");
            }
        });

        NavigationLinkList.forEach((CurrentNavigationLink) => {
            CurrentNavigationLink.classList.remove("active");
            const LinkTarget = CurrentNavigationLink.getAttribute("href");
            if (LinkTarget === `#${CurrentSectionId}`) {
                CurrentNavigationLink.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", SetActiveNavigationLink);
    SetActiveNavigationLink();
}

document.addEventListener("AllComponentsLoaded", SetupNavigation);
