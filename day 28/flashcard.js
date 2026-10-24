const flashcard = document.getElementById("flashcard");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const answerText = document.getElementById("answerText");
const frontNumber = document.getElementById("frontNumber");
const backNumber = document.getElementById("backNumber");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");

// Static flashcard deck
const flashcards = [
    {
        category: "HTML",
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language. It structures content on web pages."
    },
    {
        category: "HTML",
        question: "What is the purpose of the <a> tag?",
        answer: "It creates a hyperlink to another page, file, or location."
    },
    {
        category: "HTML",
        question: "What is semantic HTML?",
        answer: "Using meaningful elements such as header, main, article, and footer."
    },
    {
        category: "CSS",
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets. It controls the appearance and layout of web pages."
    },
    {
        category: "CSS",
        question: "What is Flexbox used for?",
        answer: "Flexbox arranges and aligns elements in a row or column."
    },
    {
        category: "CSS",
        question: "What does the CSS box model include?",
        answer: "Content, padding, border, and margin."
    },
    {
        category: "CSS",
        question: "What is a CSS transition?",
        answer: "It smoothly animates a property change over a specified duration."
    },
    {
        category: "JavaScript",
        question: "What is JavaScript used for?",
        answer: "It adds behavior and interactivity to web pages."
    },
    {
        category: "JavaScript",
        question: "What is an array?",
        answer: "An ordered collection of values stored in a single variable."
    },
    {
        category: "JavaScript",
        question: "What does addEventListener() do?",
        answer: "It registers a function to run when a specified event occurs."
    }
];

let currentIndex = 0;
let isFlipped = false;

function renderCard() {
    const card = flashcards[currentIndex];
    const cardNumber = String(currentIndex + 1).padStart(2, "0");
    const totalCards = String(flashcards.length).padStart(2, "0");

    questionCategory.textContent = card.category;
    questionText.textContent = card.question;
    answerText.textContent = card.answer;

    frontNumber.textContent = `${cardNumber} / ${totalCards}`;
    backNumber.textContent = `${cardNumber} / ${totalCards}`;

    progressText.textContent =
        `Card ${currentIndex + 1} of ${flashcards.length}`;

    const progress = ((currentIndex + 1) / flashcards.length) * 100;
    progressFill.style.width = `${progress}%`;

    progressTrack.setAttribute("aria-valuemax", flashcards.length);
    progressTrack.setAttribute("aria-valuenow", currentIndex + 1);

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === flashcards.length - 1;

    // Reset the flip whenever the card changes.
    isFlipped = false;
    flashcard.classList.remove("is-flipped");
    flashcard.setAttribute("aria-pressed", "false");
    flashcard.setAttribute(
        "aria-label",
        `Question ${currentIndex + 1}: ${card.question} Click to reveal the answer.`
    );
}

function flipCard() {
    isFlipped = !isFlipped;

    flashcard.classList.toggle("is-flipped", isFlipped);
    flashcard.setAttribute("aria-pressed", String(isFlipped));

    const card = flashcards[currentIndex];

    flashcard.setAttribute(
        "aria-label",
        isFlipped
            ? `Answer: ${card.answer}. Click to return to the question.`
            : `Question: ${card.question}. Click to reveal the answer.`
    );
}

function showNextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        renderCard();
    }
}

function showPreviousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCard();
    }
}

function shuffleCards() {
    // Fisher-Yates shuffle algorithm
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [flashcards[i], flashcards[j]] =
            [flashcards[j], flashcards[i]];
    }

    currentIndex = 0;
    renderCard();
}

// Event listeners
flashcard.addEventListener("click", flipCard);
nextButton.addEventListener("click", showNextCard);
prevButton.addEventListener("click", showPreviousCard);
shuffleButton.addEventListener("click", shuffleCards);

// Display the first card on page load.
renderCard();
