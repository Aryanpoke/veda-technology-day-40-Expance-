const quotes = [

    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },

    {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },

    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },

    {
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },

    {
        quote: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },

    {
        quote: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        quote: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },

    {
        quote: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },

    {
        quote: "Everything you can imagine is real.",
        author: "Pablo Picasso"
    },

    {
        quote: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },

    {
        quote: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },

    {
        quote: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    }
];


const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");


// Store previous quote index
let previousIndex = -1;


// Generate random quote
function generateQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(
            Math.random() * quotes.length
        );

    } while (randomIndex === previousIndex);


    previousIndex = randomIndex;


    const selectedQuote = quotes[randomIndex];


    quoteElement.textContent =
        selectedQuote.quote;

    authorElement.textContent =
        "— " + selectedQuote.author;
}


// Copy quote
copyBtn.addEventListener("click", function () {

    const text =
        `"${quoteElement.textContent}" ${authorElement.textContent}`;

    navigator.clipboard.writeText(text)
        .then(function () {

            copyBtn.textContent = "Copied!";

            setTimeout(function () {
                copyBtn.textContent = "Copy Quote";
            }, 1500);

        });

});


// Share quote
shareBtn.addEventListener("click", function () {

    const text =
        `"${quoteElement.textContent}" ${authorElement.textContent}`;

    if (navigator.share) {

        navigator.share({
            title: "Random Quote",
            text: text
        });

    } else {

        alert("Sharing is not supported in this browser.");
    }

});


// New quote button
newQuoteBtn.addEventListener(
    "click",
    generateQuote
);