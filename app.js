(function() {
  // Shared variables
  const app = {
    display: document.getElementById('display'),
    numButtons: document.querySelectorAll('.number-button'),
    operatorButtons: document.querySelectorAll('.operator-button'),
    evalButton: document.querySelector('.evaluate-button')
  }
  const state = {
    firstNum: '',
    operator: null
  };

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

  function displayCharacter(event) {
    display.textContent += event.target.textContent;
    state.firstNum += event.target.textContent;
  }

  // Event listeners
  for (let button of app.numButtons) {
    button.addEventListener('click', displayCharacter);
  }

})();