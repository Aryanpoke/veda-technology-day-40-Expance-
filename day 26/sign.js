const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const successMessage = document.getElementById("successMessage");
const togglePassword = document.getElementById("togglePassword");

// Show an error message and update the field appearance.
function setError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.classList.toggle("valid", !message && input.value.length > 0);
    input.setAttribute("aria-invalid", String(Boolean(message)));
}

// Validate the user's name.
function validateName() {
    const name = nameInput.value.trim();

    if (name.length < 2) {
        setError(nameInput, nameError,
            "Name must contain at least 2 characters.");
        return false;
    }

    if (name.length > 60) {
        setError(nameInput, nameError,
            "Name must not exceed 60 characters.");
        return false;
    }

    if (!/^[\p{L}][\p{L}\s'-]*$/u.test(name)) {
        setError(nameInput, nameError,
            "Use letters, spaces, apostrophes, or hyphens only.");
        return false;
    }

    setError(nameInput, nameError, "");
    return true;
}

// Validate email format.
function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        setError(emailInput, emailError, "Email is required.");
        return false;
    }

    if (email.length > 254 || !emailPattern.test(email)) {
        setError(emailInput, emailError,
            "Please enter a valid email address.");
        return false;
    }

    setError(emailInput, emailError, "");
    return true;
}

// Calculate password strength.
function updatePasswordStrength() {
    const password = passwordInput.value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        { text: "Password strength", width: "0%", color: "#e2e8f0" },
        { text: "Very weak", width: "20%", color: "#dc2626" },
        { text: "Weak", width: "40%", color: "#f97316" },
        { text: "Fair", width: "60%", color: "#eab308" },
        { text: "Good", width: "80%", color: "#22c55e" },
        { text: "Strong", width: "100%", color: "#15803d" }
    ];

    const level = password.length === 0
        ? levels[0]
        : levels[score];

    strengthBar.style.width = level.width;
    strengthBar.style.backgroundColor = level.color;
    strengthText.textContent = level.text;
}

// Validate password requirements.
function validatePassword() {
    const password = passwordInput.value;

    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,64}$/;

    if (!password) {
        setError(passwordInput, passwordError,
            "Password is required.");
        return false;
    }

    if (!strongPassword.test(password)) {
        setError(passwordInput, passwordError,
            "Use 8–64 characters with uppercase, lowercase, a number, and a special character.");
        return false;
    }

    setError(passwordInput, passwordError, "");
    return true;
}

// Confirm that both passwords match.
function validateConfirmPassword() {
    if (!confirmInput.value) {
        setError(confirmInput, confirmError,
            "Please confirm your password.");
        return false;
    }

    if (confirmInput.value !== passwordInput.value) {
        setError(confirmInput, confirmError,
            "Passwords do not match.");
        return false;
    }

    setError(confirmInput, confirmError, "");
    return true;
}

// Live validation while typing.
nameInput.addEventListener("input", () => {
    validateName();
    successMessage.textContent = "";
});

emailInput.addEventListener("input", () => {
    validateEmail();
    successMessage.textContent = "";
});

passwordInput.addEventListener("input", () => {
    updatePasswordStrength();
    validatePassword();

    if (confirmInput.value) {
        validateConfirmPassword();
    }

    successMessage.textContent = "";
});

confirmInput.addEventListener("input", () => {
    validateConfirmPassword();
    successMessage.textContent = "";
});

// Toggle password visibility.
togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden ? "Hide" : "Show";
    togglePassword.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
    );
});

// Validate all fields on submission.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.textContent = "";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid
    ) {
        successMessage.textContent =
            "Success! All fields have been validated.";

        form.reset();

        [nameInput, emailInput, passwordInput, confirmInput]
            .forEach((input) => {
                input.classList.remove("valid", "invalid");
                input.removeAttribute("aria-invalid");
            });

        [nameError, emailError, passwordError, confirmError]
            .forEach((error) => {
                error.textContent = "";
            });

        passwordInput.type = "password";
        togglePassword.textContent = "Show";
        togglePassword.setAttribute("aria-label", "Show password");

        updatePasswordStrength();
    } else {
        const firstInvalid = form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});
