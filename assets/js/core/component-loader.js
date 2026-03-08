async function LoadComponent(ComponentPath, TargetId) {
    try {
        const Response = await fetch(ComponentPath);
        const HtmlText = await Response.text();
        const TargetElement = document.getElementById(TargetId);
        if (TargetElement) {
            TargetElement.innerHTML = HtmlText;
        }
        document.dispatchEvent(new CustomEvent("ComponentLoaded", { detail: { TargetId } }));
    } catch (ErrorObject) {
        console.error(`Failed to load component: ${ComponentPath}`, ErrorObject);
    }
}

async function LoadAllComponents() {
    await Promise.all([
        LoadComponent("components/header.html", "HeaderComponent"),
        LoadComponent("components/hero.html", "HeroComponent"),
        LoadComponent("components/about.html", "AboutComponent"),
        LoadComponent("components/highlights.html", "HighlightsComponent"),
        LoadComponent("components/experience.html", "ExperienceComponent"),
        LoadComponent("components/swot.html", "SwotComponent"),
        LoadComponent("components/education.html", "EducationComponent"),
        LoadComponent("components/skills.html", "SkillsComponent"),
        LoadComponent("components/projects.html", "ProjectsComponent"),
        LoadComponent("components/certifications.html", "CertificationsComponent"),
        LoadComponent("components/github.html", "GithubComponent"),
        LoadComponent("components/explore.html", "ExploreComponent"),
        LoadComponent("components/contact.html", "ContactComponent"),
        LoadComponent("components/footer.html", "FooterComponent")
    ]);

    document.dispatchEvent(new CustomEvent("AllComponentsLoaded"));
}

LoadAllComponents();
