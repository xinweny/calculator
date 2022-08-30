(function() {
  //// SHARED ////
  const app = {
    display: document.getElementById('number-display'),
    numButtons: document.querySelectorAll('.number-button'),
    operatorButtons: document.querySelectorAll('.operator-button'),
    evalButton: document.querySelector('.evaluate-button'),
    clearButton: document.querySelector('.clear-button'),
    decimalButton: document.querySelector('.decimal-button'),
    deleteButton: document.querySelector('.delete-button')
  }

  const state = {
    firstNum: '',
    secondNum: '',
    operator: null,
    prevNumGiven: false,
    zeroError: false,
    justEvaluated: false,
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
  function unclickOperatorButtons() {
    for (button of app.operatorButtons) {
      if (button.classList.contains('clicked')) button.classList.remove('clicked');
    }
  }

  function checkStates() {
    if (state.zeroError) {
      app.clearButton.click();
      state.zeroError = false;
    } else if (state.justEvaluated && !(state.operator)) {
      app.clearButton.click();
      state.justEvaluated = false;
    }


    if (state.operator && state.prevNumGiven) {
      app.display.textContent = '';
      state.prevNumGiven = false;
    }
  }

  // Callback functions
  function addNumber(event) {
    checkStates();
    app.display.textContent += event.target.textContent;
  }

  function getOperator(event) {
    for (let button of app.operatorButtons) {
      button.classList[event.target == button ? 'add' : 'remove']('clicked')
    }

    const operator = event.target.textContent;
    state.operator = operator;

    if (state.prevNumGiven) {
      state.secondNum = app.display.textContent;
    } else {
      state.firstNum = app.display.textContent;
    }
    state.prevNumGiven = true;

    app.decimalButton.removeAttribute('disabled');
  }

  function evaluateExpression(event) {
    if (state.operator) state.secondNum = app.display.textContent;

    if (state.secondNum === '0' && state.operator == '/') {
      app.display.textContent = 'ERROR';
      state.zeroError = true;
    } else if (state.firstNum != '' && state.secondNum != '' && state.operator) {
      let result = operate(state.operator, Number(state.firstNum), Number(state.secondNum));

      if (result % 1 != 0) {
        result = parseFloat(result.toFixed(9));
      }

      state.firstNum = result;
      state.operator = null;
      state.secondNum = '';
      app.display.textContent = result;

      unclickOperatorButtons();
      app.decimalButton.removeAttribute('disabled');
      state.justEvaluated = true;
      state.prevNumGiven = true;
    }
  }

  function resetValues(event) {
      state.firstNum = '';
      state.operator = null;
      state.secondNum = '';
      state.prevNumGiven = false;
      state.justEvaluated = false;
      state.zeroError = false;

      app.display.textContent = '';
      
      unclickOperatorButtons();
      app.decimalButton.removeAttribute('disabled');
  }

  function addDecimal(event) {
    checkStates();
    app.display.textContent += (app.display.textContent === '') ? '0.' : '.';
    event.target.setAttribute('disabled', 'true');
  }

  function deleteChar(event) {
    const toDelete = app.display.textContent.slice(-1);
    app.display.textContent = app.display.textContent.slice(0, -1);

    if (toDelete === '.') {
      app.decimalButton.removeAttribute('disabled');
    }
  }

  //// EVENT LISTENERS ////
  // Display digit on calculator screen when number button is clicked
  for (let button of app.numButtons) {
    button.addEventListener('click', addNumber);
  }

  // Store the operator selected
  for (let button of app.operatorButtons) {
    button.addEventListener('click', getOperator);
  }
  // Evaluate pair of numbers with the selected operator
  app.evalButton.addEventListener('click', evaluateExpression);

  // Clear all state variables and display
  app.clearButton.addEventListener('click', resetValues);

  // Apply decimal
  app.decimalButton.addEventListener('click', addDecimal);

  // Delete a character at a time
  app.deleteButton.addEventListener('click', deleteChar);
})();