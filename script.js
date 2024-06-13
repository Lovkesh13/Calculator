document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const buttonSound = document.getElementById('button-sound');

    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    function playSound(){
        buttonSound.currentTime = 0;
        buttonSound.play();
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playSound();
            const buttonValue = button.textContent;

            if (button.id === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
                return;
            }

            if (button.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
                return;
            }

            if (button.hasAttribute('data-operator')) {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = button.getAttribute('data-operator');
                previousInput = currentInput;
                currentInput = '';
                display.textContent = previousInput + ' ' + buttonValue;
                return;
            }

            if (button.id === 'equals') {
                if (previousInput === '' || currentInput === '' || operator === '') return;
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
                previousInput = '';
                operator = '';
                resultDisplayed = true;
                return;
            }

            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }

            if (buttonValue === '.' && currentInput.includes('.')) return;
            currentInput += buttonValue;
            display.textContent = previousInput + ' ' + (operator === '*' ? 'x' : operator === '/' ? '÷' : operator) + ' ' + currentInput;
        });
    });

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});