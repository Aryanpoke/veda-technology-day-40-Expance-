/*  CHARACTER AND WORD COUNTER */

/*  DOM ELEMENTS */
const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");

/*  UPDATE COUNTERS */
function updateCounters() {
    const text = textInput.value;
    /*  CHARACTER COUNT */
    const characters = text.length;

    /*  WORD COUNT */
    const trimmedText = text.trim();
    let words = 0;
    if (trimmedText !== "") {
        words = trimmedText
            .split(/\s+/)
            .length;
    }

    /*  SENTENCE COUNT */
    let sentences = 0;
    if (trimmedText !== "") {
        sentences = trimmedText
            .split(/[.!?]+/)
            .filter(function (sentence) {
                return sentence.trim() !== "";
            })
            .length;
    }

    /*  UPDATE DOM */
    characterCount.textContent = characters;
    wordCount.textContent = words;
    sentenceCount.textContent = sentences;
}

/*  INPUT EVENT */
textInput.addEventListener(
    "input",
    updateCounters
);

/*  INITIAL COUNT */
updateCounters();