const DISPLAY_SIZE = 8;

let display = document.querySelector("#display");
let digitButtons = document.querySelectorAll(".number-button");
let operatorButtons = document.querySelectorAll(".operator-button");
let sqrtButton = document.querySelector("#sqrt-button");
let backButton = document.querySelector("#back-button");
let clearButton = document.querySelector("#clear-button");
let equalsButton = document.querySelector("#equals-button");

let previous = "";
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
    let currentDisplay = display.textContent;
    let buttonText = event.target.textContent;
    
    switch (buttonText) {
        case "±":
            display.textContent = -currentDisplay;
            break;
        case ".":
            if (currentDisplay.length > DISPLAY_SIZE) {
                break;
            } else if (display.textContent.includes(".")) {
                break;
            } else {
                display.textContent = currentDisplay + ".";
                break;
            }
        case "⟵":
            display.textContent = currentDisplay.slice(0, currentDisplay.length-1);
            break;
        default:
            if (currentDisplay.length > DISPLAY_SIZE) {
                break;
            } else {
                display.textContent = currentDisplay + buttonText;
                break;
            }
    }
}

function calculateOperation (event) {
    let operation = event.target.textContent;
    
}

function calculateSqrt () {
    if (+display.textContent >= 0) {
        display.textContent = roundToDisplaySize(+Math.sqrt(+display.textContent));
    } else {
        display.textContent = "ERROR";
    }
}

function clearMemory () {
    display.textContent = "";
    previous = "";
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
            return a / b;
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


