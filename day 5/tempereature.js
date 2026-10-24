// Get HTML elements

const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const temperature = document.getElementById("temperature");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Convert Button
convertBtn.addEventListener("click", function () {
    // Get input value
    const value = parseFloat(temperature.value);
    // Check empty input
    if (isNaN(value)) {
        result.innerHTML = "Please enter a temperature";
        return;
    }
    // Get selected units
    const from = fromUnit.value;
    const to = toUnit.value;
    let convertedValue;
    // Same unit
    if (from === to) {
        convertedValue = value;
    }

    // Celsius conversions
    else if (from === "celsius" && to === "fahrenheit") {
        convertedValue = (value * 9 / 5) + 32;
    }
    else if (from === "celsius" && to === "kelvin") {
        convertedValue = value + 273.15;
    }

    // Fahrenheit conversions
    else if (from === "fahrenheit" && to === "celsius") {
        convertedValue = (value - 32) * 5 / 9;
    }
    else if (from === "fahrenheit" && to === "kelvin") {
        convertedValue = (value - 32) * 5 / 9 + 273.15;
    }

    // Kelvin conversions
    else if (from === "kelvin" && to === "celsius") {
        convertedValue = value - 273.15;
    }
    else if (from === "kelvin" && to === "fahrenheit") {
        convertedValue = (value - 273.15) * 9 / 5 + 32;
    }

    // Get unit symbol
    let symbol;
    if (to === "celsius") {
        symbol = "°C";
    }
    else if (to === "fahrenheit") {
        symbol = "°F";
    }
    else {
        symbol = "K";
    }

    // Display result
    result.innerHTML =
        `${convertedValue.toFixed(2)} ${symbol}`;
});