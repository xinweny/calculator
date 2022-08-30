(function() {
  // Shared variables
  const display = document.getElementById('display');

  // Functions
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply (a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  function operate(operator, a, b) {
    switch(operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
    }
  }

  function displayCharacters() {
    const buttons = document.querySelectorAll('.number-button, .operator-button');

    for (let button of buttons) {
      button.addEventListener('click', () => {
        display.textContent += button.textContent

        if (button.classList.contains('.number-button')) params.firstNum += button.textContent;
      });
    }
  }

  function evaluateExpression() {
    const evalButton = document.querySelector('.evaluate-button');
    evalButton.addEventListener('click', () => {

    });
  }

  displayCharacters();
})();