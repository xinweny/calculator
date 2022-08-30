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
    operator: null,
    prevNumGiven: false
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

  // Helper buttons
  function unclickOperatorButtons() {
    for (button of app.operatorButtons) {
      if (button.classList.contains('clicked')) button.classList.remove('clicked');
    }
  }

  // Callback functions
  function displayCharacter(event) {
    if (state.operator && state.prevNumGiven) {
      app.display.textContent = '';
      state.prevNumGiven = false;
    }

    app.display.textContent += event.target.textContent;

    if (state.operator) {
      state.secondNum += event.target.textContent;
      state.prevNumGiven = false;
    } else {
      state.firstNum += event.target.textContent;
      state.prevNumGiven = true;
    }
  }

  function getOperator(event) {
    unclickOperatorButtons();

    state.operator = event.target.textContent;
    event.target.classList.add('clicked');
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
      unclickOperatorButtons();
      state.prevNumGiven = true;
    }
  }

  function resetValues(event) {
      state.firstNum = '';
      state.operator = null;
      state.secondNum = '';
      app.display.textContent = '';
      unclickOperatorButtons();
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

  // Clear all state variables and display
  app.clearButton.addEventListener('click', resetValues);
})();