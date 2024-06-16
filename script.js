document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const buttonSound = document.getElementById('button-sound');

    let currentInput = '';
    let expression = '';
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
                expression = '';
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
                expression += currentInput + button.getAttribute('data-operator');
                currentInput = '';
                display.textContent = expression;
                return;
            }

            if (button.id === 'equals') {
                if (currentInput === '') return;
                expression += currentInput;
                try {
                    currentInput = evaluateExpression(expression).toString();
                } catch (e) {
                    currentInput = 'Error';
                }
                display.textContent = currentInput;
                expression = '';
                resultDisplayed = true;
                return;
            }

            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }

            if (buttonValue === '.' && currentInput.includes('.')) return;
            currentInput += buttonValue;
            display.textContent = expression + currentInput;
        });
    });

    function evaluateExpression(expr) {
        return Function(`'use strict'; return (${expr})`)();
    }
});
