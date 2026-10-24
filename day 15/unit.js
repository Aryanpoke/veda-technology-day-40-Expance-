// Get HTML elements
const category = document.getElementById("category");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const clearBtn = document.getElementById("clearBtn");

// Unit options
const units = {
    length: {
        meter: "Meters",
        kilometer: "Kilometers",
        foot: "Feet",
        mile: "Miles"
    },
    weight: {
        kilogram: "Kilograms",
        gram: "Grams",
        pound: "Pounds",
        ounce: "Ounces"
    }
};

// Conversion values based on a common base unit
const conversionRates = {
    length: {
        meter: 1,
        kilometer: 1000,
        foot: 0.3048,
        mile: 1609.344
    },

    weight: {
        kilogram: 1,
        gram: 0.001,
        pound: 0.45359237,
        ounce: 0.0283495231
    }

};

// Update dropdowns
function updateUnits() {
    const selectedCategory = category.value;
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
    for (const unit in units[selectedCategory]) {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.textContent = units[selectedCategory][unit];
        fromUnit.appendChild(optionFrom);
        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.textContent = units[selectedCategory][unit];
        toUnit.appendChild(optionTo);
    }

    // Set different default units
    if (selectedCategory === "length") {
        fromUnit.value = "meter";
        toUnit.value = "foot";

    } else {
        fromUnit.value = "kilogram";
        toUnit.value = "pound";
    }
    convertUnit();
}

// Main conversion function
function convertUnit() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
        result.textContent = "0";
        resultText.textContent =
            "Enter a value to start conversion";
        return;
    }
    const selectedCategory = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    // Convert input to base unit
    const baseValue =
        value * conversionRates[selectedCategory][from];

    // Convert base unit to target unit
    const convertedValue =
        baseValue / conversionRates[selectedCategory][to];

    // Round result
    const roundedValue =
        Number(convertedValue.toFixed(4));

    result.textContent = roundedValue;
    resultText.textContent =
        `${value} ${units[selectedCategory][from]} = ${roundedValue} ${units[selectedCategory][to]}`;
}

// Clear function
function clearConverter() {
    inputValue.value = "";
    result.textContent = "0";
    resultText.textContent =
        "Enter a value to start conversion";
    inputValue.focus();
}

// Event listeners
category.addEventListener("change", updateUnits);
inputValue.addEventListener("input", convertUnit);
fromUnit.addEventListener("change", convertUnit);
toUnit.addEventListener("change", convertUnit);
clearBtn.addEventListener("click", clearConverter);
// Initialize converter
updateUnits();