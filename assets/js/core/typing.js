const TypingWordList = [
    "Software Developer",
    "Data Analytics Learner",
    "System Builder",
    "Problem Solver"
];

let CurrentWordIndex = 0;
let CurrentCharacterIndex = 0;
let IsDeletingText = false;

function RunTypingEffect() {
    const TypingTargetElement = document.getElementById("TypingText");
    if (!TypingTargetElement) {
        return;
    }

    const CurrentWord = TypingWordList[CurrentWordIndex];

    if (!IsDeletingText) {
        CurrentCharacterIndex += 1;
        TypingTargetElement.textContent = CurrentWord.substring(0, CurrentCharacterIndex);

        if (CurrentCharacterIndex === CurrentWord.length) {
            IsDeletingText = true;
            setTimeout(RunTypingEffect, 1200);
            return;
        }
    } else {
        CurrentCharacterIndex -= 1;
        TypingTargetElement.textContent = CurrentWord.substring(0, CurrentCharacterIndex);

        if (CurrentCharacterIndex === 0) {
            IsDeletingText = false;
            CurrentWordIndex += 1;

            if (CurrentWordIndex === TypingWordList.length) {
                CurrentWordIndex = 0;
            }
        }
    }

    const TypingSpeedValue = IsDeletingText ? 45 : 85;
    setTimeout(RunTypingEffect, TypingSpeedValue);
}

document.addEventListener("AllComponentsLoaded", RunTypingEffect);
