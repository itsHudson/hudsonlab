/* =========================================================
   HUDSON PORTFOLIO MASTER SCRIPT
   PURPOSE:
   1. Load component loader first
   2. Wait until components are inserted into the page
   3. Then load all other scripts safely
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    LoadJavaScriptFile("assets/js/core/component-loader.js", function () {
        WaitForComponentsThenLoadScripts();
    });
});

function WaitForComponentsThenLoadScripts() {
    const MaximumCheckCount = 60;
    let CurrentCheckCount = 0;

    const ComponentCheckTimer = setInterval(function () {
        const HeaderComponent = document.getElementById("HeaderComponent");
        const HeroComponent = document.getElementById("HeroComponent");
        const AboutComponent = document.getElementById("AboutComponent");
        const SkillsComponent = document.getElementById("SkillsComponent");
        const ContactComponent = document.getElementById("ContactComponent");

        const IsHeaderLoaded = HeaderComponent && HeaderComponent.innerHTML.trim() !== "";
        const IsHeroLoaded = HeroComponent && HeroComponent.innerHTML.trim() !== "";
        const IsAboutLoaded = AboutComponent && AboutComponent.innerHTML.trim() !== "";
        const IsSkillsLoaded = SkillsComponent && SkillsComponent.innerHTML.trim() !== "";
        const IsContactLoaded = ContactComponent && ContactComponent.innerHTML.trim() !== "";

        if (IsHeaderLoaded && IsHeroLoaded && IsAboutLoaded && IsSkillsLoaded && IsContactLoaded) {
            clearInterval(ComponentCheckTimer);
            LoadRemainingScripts();
        }

        CurrentCheckCount++;

        if (CurrentCheckCount >= MaximumCheckCount) {
            clearInterval(ComponentCheckTimer);
            LoadRemainingScripts();
        }
    }, 100);
}

function LoadRemainingScripts() {
    LoadJavaScriptFile("assets/js/core/navigation.js");
    LoadJavaScriptFile("assets/js/core/typing.js");
    LoadJavaScriptFile("assets/js/core/reveal.js");
    LoadJavaScriptFile("assets/js/core/scroll.js");
    LoadJavaScriptFile("assets/js/core/experience.js");
    LoadJavaScriptFile("assets/js/features/skill-globe.js");
    LoadJavaScriptFile("assets/js/features/project-modal.js");
    LoadJavaScriptFile("assets/js/pages/home.js");
}

function LoadJavaScriptFile(FilePath, CallbackFunction) {
    const NewScriptElement = document.createElement("script");
    NewScriptElement.src = FilePath;
    NewScriptElement.onload = function () {
        if (typeof CallbackFunction === "function") {
            CallbackFunction();
        }
    };
    document.body.appendChild(NewScriptElement);
}