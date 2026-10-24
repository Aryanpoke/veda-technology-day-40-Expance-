/*  STAR RATING WIDGET */

/*  DOM ELEMENTS */
const stars = document.querySelectorAll(".star");
const ratingNumber = document.getElementById("ratingNumber");
const ratingText = document.getElementById("ratingText");
const resetBtn = document.getElementById("resetBtn");

/*  RATING STATE */
// Selected rating is stored separately
// from the temporary hover state.
let selectedRating = 0;

/*  RATING MESSAGES */
const ratingMessages = {
    1: "Very Poor",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Excellent"
};

/*  UPDATE STARS */
function updateStars(rating, className) {
    stars.forEach(function (star) {
        const starValue = Number(
            star.dataset.value
        );

        if (starValue <= rating) {
            star.classList.add(className);
        } else {
            star.classList.remove(className);
        }
    });
}

/* CLEAR HOVER STATE */
function clearHoverState() {
    stars.forEach(function (star) {
        star.classList.remove("hovered");
    });

    // Restore selected rating
    updateStars(
        selectedRating,
        "filled"
    );
}

/* STAR HOVER */
stars.forEach(function (star) {
    star.addEventListener("mouseenter", function () {
        const hoverValue = Number(
            star.dataset.value
        );

        // Remove previous hover state
        stars.forEach(function (item) {
            item.classList.remove("hovered");

        });
        // Add hover state
        updateStars(
            hoverValue,
            "hovered"
        );
    });

    /*  STAR CLICK */
    star.addEventListener("click", function () {
        selectedRating = Number(
            star.dataset.value
        );
        // Update selected stars
        updateStars(
            selectedRating,
            "filled"
        );

        // Remove hover styles
        stars.forEach(function (item) {
            item.classList.remove("hovered");
        });

        // Update number
        ratingNumber.textContent =
            selectedRating;

        // Update message
        ratingText.textContent =
            ratingMessages[selectedRating];
    });
});

/*  MOUSE LEAVE */
document
    .getElementById("stars")
    .addEventListener("mouseleave", function () {
        clearHoverState();
    });

/*  RESET RATING */
resetBtn.addEventListener("click", function () {
    selectedRating = 0;
    // Remove all star classes
    stars.forEach(function (star) {
        star.classList.remove("filled");
        star.classList.remove("hovered");
    });

    // Reset display
    ratingNumber.textContent = "0";
    ratingText.textContent =
        "No rating selected";
});