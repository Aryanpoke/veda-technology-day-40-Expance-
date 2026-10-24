const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const remainingDisplay = document.getElementById("remaining");
const playAgainButton = document.getElementById("playAgain");
const guessButton = document.getElementById("guessButton");

let targetNumber;
let attempts;
let remaining;
const maxAttempts = 10;

function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    remaining = maxAttempts;

    attemptsDisplay.textContent = attempts;
    remainingDisplay.textContent = remaining;

    message.textContent = "Good luck! Make your first guess.";
    message.className = "";

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    playAgainButton.hidden = true;

    guessInput.focus();
}

guessForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent =
            "Please enter a whole number between 1 and 100.";
        message.className = "error";
        return;
    }

    attempts++;
    remaining--;

    attemptsDisplay.textContent = attempts;
    remainingDisplay.textContent = remaining;

    if (guess === targetNumber) {
        message.textContent =
            `🎉 Correct! You guessed ${targetNumber} in ${attempts} attempt(s).`;
        message.className = "success";
        endGame();
    } else if (remaining === 0) {
        message.textContent =
            `Game over! The secret number was ${targetNumber}.`;
        message.className = "error";
        endGame();
    } else if (guess < targetNumber) {
        message.textContent = "📈 Too low! Try a higher number.";
        message.className = "hint";
    } else {
        message.textContent = "📉 Too high! Try a lower number.";
        message.className = "hint";
    }

    guessInput.value = "";

    if (!guessInput.disabled) {
        guessInput.focus();
    }
});

function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.hidden = false;
}

playAgainButton.addEventListener("click", startGame);

startGame();
