// Generate a random HEX color
function generateRandomColor() {
    const characters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );
        color += characters[randomIndex];
    }
    return color;
}

// Generate the complete palette
function generatePalette() {
    const colorCards = document.querySelectorAll(".color-card");
    colorCards.forEach(card => {
        const color = generateRandomColor();
        const preview = card.querySelector(".color-preview");
        const hexCode = card.querySelector(".hex-code");
        const copyText = card.querySelector(".copy-text");
        preview.style.backgroundColor = color;
        hexCode.textContent = color;
        copyText.textContent = "Click to copy";
    });
}

// Copy color to clipboard
function copyColor(card) {
    const hexCode = card.querySelector(".hex-code").textContent;
    const copyText = card.querySelector(".copy-text");
    navigator.clipboard.writeText(hexCode)
        .then(() => {
            copyText.textContent = "Copied ✓";
            showToast();
            setTimeout(() => {
                copyText.textContent = "Click to copy";
            }, 1500);
        })
        .catch(() => {
            // Fallback for browsers where Clipboard API is unavailable
            const textArea = document.createElement("textarea");
            textArea.value = hexCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            copyText.textContent = "Copied ✓";
            showToast();
            setTimeout(() => {
                copyText.textContent = "Click to copy";
            }, 1500);
        });
}

// Show toast notification
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

// Generate first palette when page loads
generatePalette();