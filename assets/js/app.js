/* =========================================================
   HUDSON PORTFOLIO MASTER SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    LoadScript("assets/js/core/component-loader.js", InitCore);

});

function InitCore(){

    LoadScript("assets/js/core/navigation.js");
    LoadScript("assets/js/core/typing.js");
    LoadScript("assets/js/core/reveal.js");
    LoadScript("assets/js/core/scroll.js");
    LoadScript("assets/js/core/experience.js");

    LoadScript("assets/js/features/skill-globe.js");
    LoadScript("assets/js/features/project-modal.js");

    LoadScript("assets/js/pages/home.js");

}

function LoadScript(src, callback){

    const script = document.createElement("script");

    script.src = src;

    script.onload = () => {
        if(callback) callback();
    };

    document.body.appendChild(script);

}