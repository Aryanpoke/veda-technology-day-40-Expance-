/*  RANDOM PASSWORD GENERATOR */

/*  CHARACTER SETS */
const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()_+{}[]<>?/|~";

/*  DOM ELEMENTS */
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const message = document.getElementById("message");

/*  UPDATE PASSWORD LENGTH */
lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = lengthSlider.value;
});

/*  GENERATE PASSWORD */
function generatePassword() {
    const length = Number(lengthSlider.value);
    let characterPool = "";
    let password = "";

    /* BUILD CHARACTER POOL */
    if (uppercaseCheckbox.checked) {
        characterPool += uppercaseCharacters;
    }
    if (lowercaseCheckbox.checked) {
        characterPool += lowercaseCharacters;
    }
    if (numbersCheckbox.checked) {
        characterPool += numberCharacters;
    }
    if (symbolsCheckbox.checked) {
        characterPool += symbolCharacters;
    }

    /* NO OPTION SELECTED */
    if (characterPool.length === 0) {
        passwordInput.value = "";
        message.textContent =
            "Please select at least one character type.";
        message.style.color = "#f87171";
        return;
    }

    /* GENERATE RANDOM CHARACTERS */
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(
            Math.random() * characterPool.length
        );
        password += characterPool[randomIndex];
    }

    /* DISPLAY PASSWORD */
    passwordInput.value = password;
    message.textContent =
        "Password generated successfully!";
    message.style.color = "#22c55e";
}

/* COPY PASSWORD */
async function copyPassword() {
    const password = passwordInput.value;
    if (password === "") {
        message.textContent =
            "Generate a password first.";
        message.style.color = "#f87171";
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        message.textContent =
            "Password copied to clipboard!";
        message.style.color = "#22c55e";
    } catch (error) {
        message.textContent =
            "Unable to copy password.";
        message.style.color = "#f87171";
    }
}

/*  BUTTON EVENTS */
generateBtn.addEventListener(
    "click",
    generatePassword
);
copyBtn.addEventListener(
    "click",
    copyPassword
);

/* INITIAL PASSWORD */
generatePassword();