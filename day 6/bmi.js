const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const result = document.getElementById("result");

// Calculate BMI
calculateBtn.addEventListener("click", function () {

    // Get selected gender
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    // Get values
    const age = Number(ageInput.value);
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    // Validation
    if (!gender) {
        alert("Please select your gender.");
        return;
    }

    if (!age || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    if (!height || height <= 0) {
        alert("Please enter a valid height.");
        return;
    }

    if (!weight || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // BMI Formula
    const bmi = weight / (heightInMeters * heightInMeters);

    // Display values
    document.getElementById("resultGender").textContent =
        gender.value;

    document.getElementById("resultAge").textContent =
        age + " years";

    document.getElementById("resultHeight").textContent =
        height + " cm";

    document.getElementById("resultWeight").textContent =
        weight + " kg";

    document.getElementById("bmiValue").textContent =
        bmi.toFixed(1);

    // BMI Category
    let category;

    if (age < 20) {
        category =
            "For users under 20, BMI should be interpreted using age and sex-specific charts.";

    } 
    else if (bmi < 18.5) {
        category = "Underweight";
    } 
    else if (bmi < 25) {
        category = "Normal Weight";
    } 
    else if (bmi < 30) {
        category = "Overweight";

    } 
    else {
        category = "Obesity";
    }

    document.getElementById("bmiCategory").textContent =
        category;

    // Show result
    result.classList.add("show");

});

// Clear Button
clearBtn.addEventListener("click", function () {
    // Clear inputs
    ageInput.value = "";
    heightInput.value = "";
    weightInput.value = "";

    // Clear gender
    const genders = document.querySelectorAll(
        'input[name="gender"]'
    );

    genders.forEach(function (gender) {
        gender.checked = false;
    });

    // Reset result
    document.getElementById("resultGender").textContent = "-";
    document.getElementById("resultAge").textContent = "-";
    document.getElementById("resultHeight").textContent = "-";
    document.getElementById("resultWeight").textContent = "-";
    document.getElementById("bmiValue").textContent = "-";
    document.getElementById("bmiCategory").textContent = "-";

    // Hide result
    result.classList.remove("show");
});