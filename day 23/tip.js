const billInput = document.getElementById("billAmount");
const customTipInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");

const tipButtons = document.querySelectorAll(".tip-btn");
const decreaseBtn = document.getElementById("decreasePeople");
const increaseBtn = document.getElementById("increasePeople");
const resetBtn = document.getElementById("resetBtn");
const errorMessage = document.getElementById("errorMessage");

const totalAmount = document.getElementById("totalAmount");
const tipAmount = document.getElementById("tipAmount");
const billPerPerson = document.getElementById("billPerPerson");
const tipPerPerson = document.getElementById("tipPerPerson");
const totalPerPerson = document.getElementById("totalPerPerson");
const splitText = document.getElementById("splitText");

let selectedTip = 15;

// Format values as Indian Rupee currency.
function formatCurrency(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Read and validate inputs, then calculate the results.
function calculateTip() {
    const bill = Number(billInput.value);
    const peopleValue = peopleInput.value.trim();
    const people = Number(peopleValue);
    const customTipValue = customTipInput.value.trim();

    const tipRate = customTipValue !== ""
        ? Number(customTipValue)
        : selectedTip;

    // Validate the bill amount.
    if (
        billInput.value.trim() === "" ||
        !Number.isFinite(bill) ||
        bill < 0
    ) {
        showError("Please enter a valid, non-negative bill amount.");
        return;
    }

    // Validate the number of people.
    if (
        peopleValue === "" ||
        !Number.isInteger(people) ||
        people < 1
    ) {
        showError("Enter a whole number of people (at least 1).");
        return;
    }

    // Validate the tip percentage.
    if (
        !Number.isFinite(tipRate) ||
        tipRate < 0 ||
        tipRate > 100
    ) {
        showError("Tip percentage must be between 0% and 100%.");
        return;
    }

    errorMessage.textContent = "";

    // Calculate the tip and totals.
    const tip = bill * (tipRate / 100);
    const total = bill + tip;

    const basePerPerson = bill / people;
    const tipEach = tip / people;
    const totalEach = total / people;

    // Update the results.
    totalAmount.textContent = formatCurrency(total);
    tipAmount.textContent = formatCurrency(tip);
    billPerPerson.textContent = formatCurrency(basePerPerson);
    tipPerPerson.textContent = formatCurrency(tipEach);
    totalPerPerson.textContent = formatCurrency(totalEach);

    splitText.textContent =
        `Split between ${people} ${people === 1 ? "person" : "people"}`;
}

function showError(message) {
    errorMessage.textContent = message;

    totalAmount.textContent = "—";
    tipAmount.textContent = "—";
    billPerPerson.textContent = "—";
    tipPerPerson.textContent = "—";
    totalPerPerson.textContent = "—";
    splitText.textContent = "Check your inputs";
}

// Handle preset tip percentage buttons.
tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedTip = Number(button.dataset.tip);

        // Clear the custom tip when a preset is selected.
        customTipInput.value = "";

        tipButtons.forEach((btn) => {
            btn.classList.toggle("active", btn === button);
        });

        calculateTip();
    });
});

// When a custom percentage is entered, deselect presets.
customTipInput.addEventListener("input", () => {
    tipButtons.forEach((button) => {
        button.classList.remove("active");
    });

    calculateTip();
});

// Recalculate live whenever the bill or people count changes.
billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

// Increase or decrease the number of people.
increaseBtn.addEventListener("click", () => {
    const current = Number(peopleInput.value);

    if (Number.isInteger(current) && current >= 1) {
        peopleInput.value = current + 1;
    } else {
        peopleInput.value = 1;
    }

    calculateTip();
});

decreaseBtn.addEventListener("click", () => {
    const current = Number(peopleInput.value);

    if (Number.isInteger(current) && current > 1) {
        peopleInput.value = current - 1;
    } else {
        peopleInput.value = 1;
    }

    calculateTip();
});

// Reset all fields to their default values.
resetBtn.addEventListener("click", () => {
    billInput.value = "1000";
    peopleInput.value = "2";
    customTipInput.value = "";
    selectedTip = 15;

    tipButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            Number(button.dataset.tip) === selectedTip
        );
    });

    calculateTip();
});

// Display initial calculations.
calculateTip();
