$(document).ready(() => {
    //get elements by selectors and store to global varibles
    const numButtons = $(".number");
    const operButtons = $(".operator");
    const clearAllButton = $("#clear-all")
    const clearButton = $("#clear")
    const totalButton = $("#equals")
    const upperRow = $("#upper-row");
    const lowerRow = $("#lower-row");

    //global variables for different rows in display
    let currentOperand = "";
    let previousOperand = "";
    let operation;

    //functions
    function clearAll() {
        currentOperand = "";
        previousOperand = "";
        operation = undefined;
    }

    function clear() {
        currentOperand = currentOperand.toString().slice(0, -1)
    }

    function appendNum(num) {
        if (num === "." && currentOperand.includes(".")) return false;
        currentOperand = currentOperand.toString() + num.toString();
    }

    function chooseOperation(oper) {
        if (currentOperand === "") return false;
        if (previousOperand !== "") {
            getTotal();
        }
        operation = oper;
        previousOperand = currentOperand;
        currentOperand = "";
    }

    function getTotal() {
        let total;
        const previous = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(previous) || isNaN(current)) return false;
        switch (operation) {
            case "+":
                total = previous + current;
                break;
            case "-":
                total = previous - current;
                break;
            case "/":
                total = previous / current;
                break;
            case "x":
                total = previous * current;
                break;
            default:
                return false;
        }
        currentOperand = total;
        operation = undefined;
        previousOperand = "";
    }

    function updateDisplay() {
        lowerRow.text(currentOperand);
        upperRow.text(previousOperand);
    }

    //Event Listeners
    numButtons.on("click", function () {
        appendNum(this.innerText)
        updateDisplay();
    })

    operButtons.on("click", function () {
        chooseOperation(this.innerText)
        updateDisplay();
    })

    clearAllButton.on("click", () => {
        clearAll();
        updateDisplay();
    })

    totalButton.on("click", () => {
        getTotal();
        updateDisplay();
    })

    clearButton.on("click", () => {
        clear();
        updateDisplay();
    })

})