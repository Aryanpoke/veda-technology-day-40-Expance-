const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");
const counter = document.getElementById("counter");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const carousel = document.querySelector(".carousel");

let currentIndex = 0;
let timer = null;
let isPlaying = true;

const totalSlides = slides.length;
const intervalTime = 4000;

// Create one indicator for each slide.
slides.forEach((slide, index) => {
    const indicator = document.createElement("button");

    indicator.className = "indicator";
    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);

    indicator.addEventListener("click", () => {
        showSlide(index);
        restartTimer();
    });

    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll(".indicator");

// Display the selected slide.
function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
        indicators[i].classList.toggle("active", i === currentIndex);

        if (i === currentIndex) {
            indicators[i].setAttribute("aria-current", "true");
        } else {
            indicators[i].removeAttribute("aria-current");
        }
    });

    counter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ` +
        `${String(totalSlides).padStart(2, "0")}`;
}

// Move to the next slide.
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Move to the previous slide.
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Start automatic rotation.
function startTimer() {
    clearInterval(timer);

    if (isPlaying) {
        timer = setInterval(nextSlide, intervalTime);
    }
}

// Restart the timer after manual navigation.
function restartTimer() {
    startTimer();
}

function updatePlayButton() {
    playIcon.textContent = isPlaying ? "Ⅱ" : "▶";
    playText.textContent = isPlaying
        ? "Pause slideshow"
        : "Play slideshow";

    playBtn.setAttribute("aria-pressed", String(isPlaying));
}

// Previous and next controls.
nextBtn.addEventListener("click", () => {
    nextSlide();
    restartTimer();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    restartTimer();
});

// Play/pause control.
playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    updatePlayButton();
    startTimer();
});

// Pause while the pointer is over the carousel.
carousel.addEventListener("mouseenter", () => {
    clearInterval(timer);
});

carousel.addEventListener("mouseleave", () => {
    startTimer();
});

// Pause automatic movement while the page is in the background.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(timer);
    } else {
        startTimer();
    }
});

// Keyboard navigation.
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextSlide();
        restartTimer();
    } else if (event.key === "ArrowLeft") {
        prevSlide();
        restartTimer();
    }
});

// Initialize the carousel.
showSlide(0);
updatePlayButton();
startTimer();
