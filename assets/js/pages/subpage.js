function SetCurrentYear() {
    const YearElementList = document.querySelectorAll("[data-current-year]");
    const CurrentYearValue = new Date().getFullYear();
    YearElementList.forEach((CurrentElement) => {
        CurrentElement.textContent = CurrentYearValue;
    });
}

window.addEventListener("load", SetCurrentYear);
