const DISPLAY_SIZE = 7;

let display = document.querySelector("#display");
let digitButtons = document.querySelectorAll(".number-button");
let operatorButtons = document.querySelectorAll(".operator-button");
let sqrtButton = document.querySelector("#sqrt-button");
let backButton = document.querySelector("#back-button");
let clearButton = document.querySelector("#clear-button");
let equalsButton = document.querySelector("#equals-button");

let currentValue = "";
let previousValue = "";
let operation = "";

for (let digit of digitButtons) {
    digit.addEventListener("click", updateDisplay);
}
backButton.addEventListener("click", updateDisplay);
for (let operator of operatorButtons) {
    operator.addEventListener("click", calculateOperation);
}
sqrtButton.addEventListener("click", calculateSqrt);
equalsButton.addEventListener("click", calculateOperation);
clearButton.addEventListener("click", clearMemory);

function updateDisplay (event) {
    let buttonText = event.target.textContent;
    
    switch (buttonText) {
        case "±":
            if (currentValue === "" && display.textContent !== currentValue) {
                // check if current display is result of previous calculation
                display.textContent = -display.textContent;
                previousValue = display.textContent;
            } else {
                currentValue = -currentValue;
                display.textContent = currentValue;
            }
            break;
        case ".":
            if (currentValue.length > DISPLAY_SIZE) {
                break;
            } else if (currentValue.includes(".")) {
                break;
            } else {
                currentValue = currentValue + ".";
                display.textContent = currentValue;
                break;
            }
        case "⟵":
            currentValue = currentValue.slice(0, currentValue.length-1);
            display.textContent = currentValue;
            break;
        default:
            if (currentValue.length > DISPLAY_SIZE) {
                break;
            } else if (currentValue === "" || currentValue === "ERROR") {
                currentValue = buttonText;
                display.textContent = currentValue;
            } else {
                currentValue = currentValue + buttonText;
                display.textContent = currentValue;
                break;
            }
    }
}

function calculateOperation (event) {
    if (previousValue === "" && operation === "") {
        previousValue = currentValue;
        currentValue = "";
        operation = (event.target.textContent === "=") ? "" : event.target.textContent;
    } else if (operation === "") {
        currentValue = "";
        operation = (event.target.textContent === "=") ? "" : event.target.textContent;
    } else {
        display.textContent = 
                roundToDisplaySize(operate(+previousValue, +currentValue, operation));
        previousValue = display.textContent;
        currentValue = "";
        operation = (event.target.textContent === "=") ? "" : event.target.textContent;
    }
}

function calculateSqrt () {
    if (+display.textContent >= 0) {
        display.textContent = roundToDisplaySize(+Math.sqrt(+display.textContent));
        currentValue = "";
        previousValue = display.textContent;
        operation = "";
    } else {
        currentValue = "ERROR";
        display.textContent = currentValue;
        previousValue = "";
        operation = "";
    }
}

function clearMemory () {
    currentValue = "";
    display.textContent = "0";
    previousValue = "";
    operation = "";
}


function operate (a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "÷":
            return (b === 0)? "ERROR" : a / b;
            break;
        case "×":
            return a * b;
            break;
        case "xⁿ":
            return a ** b;
            break;
        default:
            return "ERROR";
            break;
    }
}

function roundToDisplaySize(number) {
    let numberAsString = number.toString();
    let decimalPosition = numberAsString.indexOf(".");
    if (decimalPosition === -1 && numberAsString.length > DISPLAY_SIZE) {
        return number.toExponential(3);
    } else if (decimalPosition !== -1 && numberAsString.length > DISPLAY_SIZE) {
        return number.toFixed(DISPLAY_SIZE - decimalPosition);
    } else {
        return number;
    }
  }


