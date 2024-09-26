const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');
let currentButton = null;
let firstNumber;
let newOp = false;
let lastOp;

operators = {
    "divide": function(a, b) {
        if (b == 0) return 'Whoops!';
        else return a / b;
    },
    'multiply': (a, b) => a * b,
    'subtract': (a, b) => a - b,
    'add': (a, b) => a + b,
}

buttons.forEach((button) => {
    const key = button.innerText;
    const value = button.dataset.value;
    button.addEventListener('mousedown', (e) => {
        currentButton = e.target;
        currentButton.classList.add('btn-down');
    });

    document.addEventListener('mouseup', () => {
        if (currentButton) {
            currentButton.classList.remove('btn-down');
            currentButton = null;
        }
    });

    button.addEventListener('click', () => {
    if (!isThereSpace()) return;
    if (lastOp == 'result') reset();
    if (button.classList.contains('num')) {

                if (screen.innerText == '0' || newOp == true) {
                    screen.innerText = +key;
                    newOp = false;
                }
                else {
                screen.innerText += +key
            };
    };

    if (button.classList.contains('operator')) {
        operate(value);
    };


    })
});

function isThereSpace () {
    if (screen.innerText.length < 9) return true;
    else return false;
}

function operate (operator) {
    let currentNumber = +screen.innerText;
    let result;
    if (operator == 'signchange') {
        screen.innerText = currentNumber * -1;
        return;
    }
    newOp = true;
    if (firstNumber == undefined) {
        firstNumber = currentNumber;
        lastOp = operator;
        return;
    } 

    if (lastOp !== operator) {
        result = operators[lastOp](firstNumber, currentNumber);
    } else {
        result = operators[operator](firstNumber, currentNumber)
    }

    lastOp = operator;
    if (result > 99999999) {
        screen.innerText = 'TooMuch!';
        reset();
        return;
    } else if (Number.isInteger(parseFloat(result))) {
        screen.innerText = parseFloat(result)
    } else if (typeof result == 'string') {
        screen.innerText = result;
        reset();
        return;
    } else screen.innerText = result.toFixed(1);
    firstNumber = result;
    
}

function reset() {
    newOp = true;
    firstNumber = undefined;
    lastOp = undefined;
}

const clear = document.querySelector('.clear');
const canc = document.querySelector('.canc');
const float = document.querySelector('.float');

clear.addEventListener('click', () => {
    reset();
    screen.innerText = 0;
})

canc.addEventListener('click', () => {
    const string = screen.innerText.toString()
    let newString = Number(string.slice(0, -1))
    if (!newString) newString = 0;
    screen.innerText = newString;
})

float.addEventListener('click', () => {
    let string = screen.innerText.toString();
    if (string.includes('.')) return;
    screen.innerText = string + '.';
    if (lastOp !== 'result') newOp = false;
})