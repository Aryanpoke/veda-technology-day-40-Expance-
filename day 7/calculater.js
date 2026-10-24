const display = document.getElementById("display");
let currentNumber = "";
let previousNumber = "";
let operator = null;

// Add number to display
function appendNumber(number) {
    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }
    // If error is displayed, start again
    if (
        display.textContent === "Error" ||
        display.textContent === "Cannot divide by 0"
    ) {
        currentNumber = "";
        previousNumber = "";
        operator = null;
    }
    currentNumber += number;
    // Show complete expression
    if (operator !== null) {
        display.textContent =
            previousNumber + " " + getDisplayOperator(operator) + " " + currentNumber;
    } else {
        display.textContent = currentNumber;
    }
}

// Select operator
function chooseOperator(selectedOperator) {
    if (currentNumber === "") {
        return;
    }
    // If operator already exists, calculate first
    if (operator !== null && previousNumber !== "") {
        calculate();
    }
    previousNumber = currentNumber;
    currentNumber = "";
    operator = selectedOperator;
    // Show number and operator
    display.textContent =
        previousNumber + " " + getDisplayOperator(operator);
}
// Convert JavaScript operator into calculator symbol
function getDisplayOperator(operator) {
    switch (operator) {
        case "+":
            return "+";
        case "-":
            return "−";
        case "*":
            return "×";
        case "/":
            return "÷";
        default:
            return "";
    }
}

// Calculate result
function calculate() {
    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {
        return;
    }
    const firstNumber = Number(previousNumber);
    const secondNumber = Number(currentNumber);
    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            // Divide by zero handling
            if (secondNumber === 0) {
                display.textContent = "Cannot divide by 0";
                currentNumber = "";
                previousNumber = "";
                operator = null;
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }

    // Remove unnecessary decimal zeros
    result = Number(result.toFixed(10));
    // Show result
    display.textContent = result;
    // Store result for next calculation
    currentNumber = result.toString();
    previousNumber = "";
    operator = null;
}

// Clear calculator
function clearDisplay() {
    currentNumber = "";
    previousNumber = "";
    operator = null;
    display.textContent = "0";
}