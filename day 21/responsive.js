
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close the mobile navigation
function toggleMenu() {
    const isOpen = navMenu.classList.toggle("show");

    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

hamburger.addEventListener("click", toggleMenu);

// Close the menu after selecting a navigation link
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open navigation menu");

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

// Close the menu with the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open navigation menu");

        hamburger.focus();
    }
});

// Reset mobile menu when returning to desktop layout
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open navigation menu");
    }
});
