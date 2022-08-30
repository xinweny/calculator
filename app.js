(function() {
  //// SHARED ////
  const app = {
    display: document.getElementById('display'),
    numButtons: document.querySelectorAll('.number-button'),
    operatorButtons: document.querySelectorAll('.operator-button'),
    evalButton: document.querySelector('.evaluate-button'),
    clearButton: document.querySelector('.clear-button')
  }

  const state = {
    firstNum: '',
    secondNum: '',
    operator: null
  };

  //// FUNCTIONS ////
  // Basic functions
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

  // Helper functions

  // Callback functions
  function displayCharacter(event) {
    app.display.textContent += event.target.textContent;

    if (state.operator) {
      state.secondNum += event.target.textContent;
    } else {
      state.firstNum += event.target.textContent;
    }
  }

  function getOperator(event) {
    state.operator = event.target.textContent;
  }

  function evaluateExpression(event) {
    if (state.firstNum != '' && state.secondNum != '' && state.operator) {
      const result = operate(state.operator, 
        Number(state.firstNum), 
        Number(state.secondNum));

      state.firstNum = result;
      state.operator = null;
      state.secondNum = '';

      app.display.textContent = result;
    }
  }

  //// EVENT LISTENERS ////
  // Display digit on calculator screen when number button is clicked
  for (let button of app.numButtons) {
    button.addEventListener('click', displayCharacter);
  }

  // Store the operator selected
  for (let button of app.operatorButtons) {
    button.addEventListener('click', getOperator);
  }
  // Evaluate pair of numbers with the selected operator
  app.evalButton.addEventListener('click', evaluateExpression);

})();