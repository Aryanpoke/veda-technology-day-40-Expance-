// Get all gallery images
const galleryImages = document.querySelectorAll(".gallery-item img");
// Get lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");

// Open Image Preview
galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        // Set clicked image as lightbox image
        lightboxImage.src = image.src;
        // Use original alt text
        lightboxImage.alt = image.alt;
        // Show lightbox
        lightbox.classList.add("active");
        // Prevent background scrolling
        document.body.style.overflow = "hidden";
    });

});

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    // Enable scrolling again
    document.body.style.overflow = "auto";
}

// Close using button
closeBtn.addEventListener("click", closeLightbox);

// Close When Clicking Outside
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close Using ESC Key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});