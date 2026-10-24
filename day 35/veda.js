
"use strict";

// =====================================
// 1. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            navMenu.classList.add("open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
            document.body.classList.add("menu-open");
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMenu();
        }
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close the mobile menu on desktop screens.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });
}


/* =====================================
   ACTIVE NAVIGATION ON SCROLL
===================================== */

const navSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {
    let currentSection = "home";

    // Header ke neeche current visible section identify karo.
    const scrollPosition = window.scrollY + 180;

    navSections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

window.addEventListener("load", updateActiveNavigation);
window.addEventListener("resize", updateActiveNavigation);

// Navbar link click karne par bhi active state update karo.
navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").slice(1);

        navigationLinks.forEach((item) => {
            const isActive =
                item.getAttribute("href") === `#${targetId}`;

            item.classList.toggle("active", isActive);
        });
    });
});


// =====================================
// 3. FAQ ACCORDION
// Multiple answers can stay open.
// =====================================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const isExpanded =
            question.getAttribute("aria-expanded") === "true";

        const answer = question.nextElementSibling;

        if (!answer || !answer.classList.contains("faq-answer")) {
            return;
        }

        question.setAttribute("aria-expanded", String(!isExpanded));
        answer.hidden = isExpanded;
    });
});


// =====================================
// 4. AUTOMATIC FOOTER YEAR
// =====================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =====================================
// 5. CONTACT FORM VALIDATION
// =====================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
    name: {
        input: document.getElementById("name"),
        error: document.getElementById("nameError")
    },
    email: {
        input: document.getElementById("email"),
        error: document.getElementById("emailError")
    },
    subject: {
        input: document.getElementById("subject"),
        error: document.getElementById("subjectError")
    },
    message: {
        input: document.getElementById("message"),
        error: document.getElementById("messageError")
    }
};

// Display or clear an individual field error.
function setError(field, message) {
    if (!field.input || !field.error) return;

    field.error.textContent = message;
    field.input.classList.toggle("invalid", Boolean(message));

    if (message) {
        field.input.setAttribute("aria-invalid", "true");
    } else {
        field.input.removeAttribute("aria-invalid");
    }
}

// Validate each field.
function validateField(fieldName) {
    const field = fields[fieldName];

    if (!field || !field.input) return false;

    const value = field.input.value.trim();
    let error = "";

    switch (fieldName) {
        case "name":
            if (value.length < 2) {
                error = "Please enter at least 2 characters.";
            } else if (value.length > 80) {
                error = "Name must be 80 characters or fewer.";
            }
            break;

        case "email": {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value) {
                error = "Please enter your email address.";
            } else if (value.length > 254) {
                error = "Email address is too long.";
            } else if (!emailPattern.test(value)) {
                error = "Please enter a valid email address.";
            }
            break;
        }

        case "subject":
            if (value.length < 3) {
                error = "Subject must contain at least 3 characters.";
            } else if (value.length > 120) {
                error = "Subject must be 120 characters or fewer.";
            }
            break;

        case "message":
            if (value.length < 10) {
                error = "Message must contain at least 10 characters.";
            } else if (value.length > 2000) {
                error = "Message must be 2000 characters or fewer.";
            }
            break;
    }

    setError(field, error);
    return error === "";
}

// Validate fields while the user types.
Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    if (!field.input) return;

    field.input.addEventListener("input", () => {
        validateField(fieldName);

        if (formStatus) {
            formStatus.textContent = "";
            formStatus.classList.remove("error", "success");
        }
    });

    // Validate when leaving a field.
    field.input.addEventListener("blur", () => {
        if (field.input.value.trim() !== "") {
            validateField(fieldName);
        }
    });
});

// Validate the complete form on submission.
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (formStatus) {
            formStatus.textContent = "";
            formStatus.classList.remove("error", "success");
        }

        let isValid = true;
        let firstInvalidField = null;

        Object.keys(fields).forEach((fieldName) => {
            const valid = validateField(fieldName);

            if (!valid) {
                isValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = fields[fieldName].input;
                }
            }
        });

        if (!isValid) {
            if (formStatus) {
                formStatus.textContent =
                    "Please correct the highlighted fields and try again.";
                formStatus.classList.add("error");
            }

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        if (formStatus) {
            formStatus.textContent =
                "Validation successful! Your enquiry has not been sent.";
            formStatus.classList.add("success");
        }

        // Clear errors and reset the form after successful validation.
        contactForm.reset();

        Object.values(fields).forEach((field) => {
            setError(field, "");
        });
    });
}
