const choices = ["rock", "paper", "scissors"];

const icons = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const drawScoreElement = document.getElementById("drawScore");

const playerChoiceElement = document.getElementById("playerChoice");
const computerChoiceElement = document.getElementById("computerChoice");

const playerLabel = document.getElementById("playerLabel");
const computerLabel = document.getElementById("computerLabel");

const resultElement = document.getElementById("result");
const messageElement = document.getElementById("message");
const resultBox = document.querySelector(".result-box");

const choiceButtons = document.querySelectorAll(".choice-btn");
const resetButton = document.getElementById("resetBtn");

// Play a round when the user selects a choice
choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        playGame(button.dataset.choice);
    });
});

function playGame(playerChoice) {
    // Generate a random computer choice
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    // Update the displayed choices
    playerChoiceElement.textContent = icons[playerChoice];
    computerChoiceElement.textContent = icons[computerChoice];

    playerLabel.textContent = playerChoice;
    computerLabel.textContent = computerChoice;

    // Compare the choices
    if (playerChoice === computerChoice) {
        drawScore++;
        showResult("It's a Draw!", "Both selected the same choice.", "draw");
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        showResult("You Win!", "Great move! You won this round.", "win");
    } else {
        computerScore++;
        showResult("You Lose!", "The computer won this round. Try again!", "lose");
    }

    updateScore();
}

function showResult(title, message, status) {
    resultElement.textContent = title;
    messageElement.textContent = message;

    resultBox.classList.remove("win", "lose", "draw");
    resultBox.classList.add(status);
}

function updateScore() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    drawScoreElement.textContent = drawScore;
}

// Reset all scores and restore the initial screen
resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;

    updateScore();

    playerChoiceElement.textContent = "❔";
    computerChoiceElement.textContent = "🤖";

    playerLabel.textContent = "Waiting...";
    computerLabel.textContent = "Waiting...";

    resultElement.textContent = "Ready to play?";
    messageElement.textContent = "Select your move below to start.";

    resultBox.classList.remove("win", "lose", "draw");
});
