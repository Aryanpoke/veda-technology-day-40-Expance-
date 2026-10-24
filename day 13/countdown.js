// Target date
const targetDate = new Date("October 31, 2026 00:00:00").getTime();

// Get HTML elements
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const messageElement = document.getElementById("message");

// Countdown function
function updateCountdown() {

    // Get current date and time
    const currentDate = new Date().getTime();

    // Calculate remaining time
    const difference = targetDate - currentDate;

    // Check if countdown has ended
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        messageElement.textContent = "🎉 Countdown has ended!";
        messageElement.classList.add("finished");

        clearInterval(countdownInterval);

        return;
    }

    // Convert milliseconds into days
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    // Convert remaining milliseconds into hours
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    // Convert remaining milliseconds into minutes
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    // Convert remaining milliseconds into seconds
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    // Display values
    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Run immediately
updateCountdown();

// Update every second
const countdownInterval = setInterval(
    updateCountdown,
    1000
);