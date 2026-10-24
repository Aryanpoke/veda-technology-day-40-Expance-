// Select all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

// Add click event to every FAQ question
faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {

        // Check whether current FAQ is already open
        const isActive = item.classList.contains("active");

        // Toggle current FAQ
        if (!isActive) {

            // Open current FAQ
            item.classList.add("active");

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            // Close current FAQ
            item.classList.remove("active");

            answer.style.maxHeight = null;
        }

    });

});