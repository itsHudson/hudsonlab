export function InitializeTypingEffect() {
    const TypingWords = [
        "Software Developer",
        "Data Analytics Learner",
        "System Builder",
        "Problem Solver"
    ];

    let CurrentWordIndex = 0;
    let CurrentCharacterIndex = 0;
    let IsDeletingText = false;

    const TypingTextElement = document.getElementById("TypingText");

    function RunTypingEffect() {
        if (!TypingTextElement) {
            return;
        }

        const CurrentWord = TypingWords[CurrentWordIndex];

        if (!IsDeletingText) {
            CurrentCharacterIndex += 1;
            TypingTextElement.textContent = CurrentWord.substring(0, CurrentCharacterIndex);

            if (CurrentCharacterIndex === CurrentWord.length) {
                IsDeletingText = true;
                window.setTimeout(RunTypingEffect, 1200);
                return;
            }
        } else {
            CurrentCharacterIndex -= 1;
            TypingTextElement.textContent = CurrentWord.substring(0, CurrentCharacterIndex);

            if (CurrentCharacterIndex === 0) {
                IsDeletingText = false;
                CurrentWordIndex += 1;

                if (CurrentWordIndex === TypingWords.length) {
                    CurrentWordIndex = 0;
                }
            }
        }

        const TypingSpeed = IsDeletingText ? 45 : 85;
        window.setTimeout(RunTypingEffect, TypingSpeed);
    }

    RunTypingEffect();
}
