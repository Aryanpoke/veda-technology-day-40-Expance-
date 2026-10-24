const skillsSection = document.getElementById("skillsSection");
const progressBars = document.querySelectorAll(".progress-fill");
const percentages = document.querySelectorAll(".percentage");
const replayButton = document.getElementById("replayButton");

let hasAnimated = false;

function animateSkills() {
    if (hasAnimated) return;

    hasAnimated = true;

    progressBars.forEach((bar, index) => {
        const target = Number(bar.dataset.progress);
        const percentage = percentages[index];

        // Reset the bar and counter before starting.
        bar.style.width = "0%";
        percentage.textContent = "0%";

        // Start the animation after a small delay.
        setTimeout(() => {
            bar.style.width = `${target}%`;
        }, index * 150);

        // Animate the percentage number.
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();
        const delay = index * 150;

        function updateCounter(now) {
            const elapsed = now - startTime - delay;

            if (elapsed < 0) {
                requestAnimationFrame(updateCounter);
                return;
            }

            const progress = Math.min(elapsed / duration, 1);
            current = Math.round(progress * target);

            percentage.textContent = `${current}%`;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Trigger the animation when the section enters the viewport.
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    observer.observe(skillsSection);
} else {
    // Fallback for browsers without IntersectionObserver.
    animateSkills();
}

// Replay the animations whenever the user clicks the button.
replayButton.addEventListener("click", () => {
    hasAnimated = false;

    progressBars.forEach((bar) => {
        bar.style.transition = "none";
        bar.style.width = "0%";
    });

    percentages.forEach((percentage) => {
        percentage.textContent = "0%";
    });

    // Allow the browser to apply the reset before animating again.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            progressBars.forEach((bar) => {
                bar.style.transition = "";
            });

            animateSkills();
        });
    });
});
