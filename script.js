let display = document.querySelector("#display");
let digitButtons = document.querySelectorAll(".number-button");
let operatorButtons = document.querySelectorAll(".operator-button");
let sqrtButton = document.querySelector("#sqrt-button");
let backButton = document.querySelector("#back-button");
let clearButton = document.querySelector("#clear-button");
let equalsButton = document.querySelector("#equals-button");

let previous = "";
let operation = "";


function updateDisplay (event) {
    event.target.textContent
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

function squareRoot(a) {
    if (a >= 0) {
        return Math.sqrt(a);
    } else {
        return "ERROR";
    }
}



