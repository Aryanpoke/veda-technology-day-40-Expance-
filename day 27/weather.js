// Get the required elements.
const weatherSelect = document.getElementById("weatherSelect");
const weatherIcon = document.getElementById("weatherIcon");
const weatherTitle = document.getElementById("weatherTitle");
const weatherDescription = document.getElementById(
    "weatherDescription"
);
const resetButton = document.getElementById("resetButton");

// Store weather conditions and their matching display data.
const weatherData = {
    sunny: {
        icon: "☀️",
        title: "Sunny",
        description:
            "Bright sunshine and clear skies. A cheerful day for outdoor activities."
    },

    cloudy: {
        icon: "☁️",
        title: "Cloudy",
        description:
            "Clouds cover the sky, creating a calm and shaded atmosphere."
    },

    rainy: {
        icon: "🌧️",
        title: "Rainy",
        description:
            "Raindrops are falling from the clouds. Keep your umbrella nearby!"
    },

    stormy: {
        icon: "⛈️",
        title: "Stormy",
        description:
            "Dark clouds, thunder, and lightning create a dramatic stormy scene."
    },

    snowy: {
        icon: "❄️",
        title: "Snowy",
        description:
            "Soft snowflakes fall through the cold air, covering the scenery in white."
    },

    foggy: {
        icon: "🌫️",
        title: "Foggy",
        description:
            "A layer of fog surrounds the landscape, making distant objects harder to see."
    },

    windy: {
        icon: "🌬️",
        title: "Windy",
        description:
            "Moving air rustles the leaves and sends the clouds drifting across the sky."
    }
};

// Default state shown before a weather condition is selected.
const defaultWeather = {
    icon: "🌍",
    title: "Explore the Weather",
    description:
        "Choose a condition from the dropdown to get started."
};

// Render the selected condition or return to the default state.
function updateWeather() {
    const selectedWeather = weatherSelect.value;

    const isValidWeather = Object.prototype.hasOwnProperty.call(
        weatherData,
        selectedWeather
    );

    const currentWeather = isValidWeather
        ? weatherData[selectedWeather]
        : defaultWeather;

    weatherIcon.textContent = currentWeather.icon;
    weatherTitle.textContent = currentWeather.title;
    weatherDescription.textContent = currentWeather.description;

    document.body.dataset.weather = isValidWeather
        ? selectedWeather
        : "default";
}

// Update the display whenever the dropdown selection changes.
weatherSelect.addEventListener("change", updateWeather);

// Restore the initial state.
resetButton.addEventListener("click", () => {
    weatherSelect.value = "";
    updateWeather();
    weatherSelect.focus();
});

// Set the initial display.
updateWeather();