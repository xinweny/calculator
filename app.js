(function() {
  //// SHARED ////
  const app = {
    display: document.getElementById('number-display'),
    numButtons: document.querySelectorAll('.number-button'),
    operatorButtons: document.querySelectorAll('.operator-button'),
    evalButton: document.querySelector('.evaluate-button'),
    clearButton: document.querySelector('.clear-button'),
    decimalButton: document.querySelector('.decimal-button')
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
    if (state.justEvaluated || state.zeroError) {
      app.clearButton.click();
      state.zeroError = false;
      state.justEvaluated = false;
    } else if (!state.justEvaluated) {
      app.display.textContent = '';
    } else if (state.operator && state.prevNumGiven) {
      app.display.textContent = '';
      state.prevNumGiven = false;
    } 
  }

  function appendChar(char) {
    if (state.operator) {
      if (state.firstNum === '') state.firstNum = '0';
      state.secondNum += char;
      state.prevNumGiven = false;
    } else {
      state.firstNum += char;
      state.prevNumGiven = true;
    }

    app.display.textContent += char;
  }

  // Callback functions
  function addNumber(event) {
    checkStates();
    appendChar(event.target.textContent);
  }

  function getOperator(event) {
    for (let button of app.operatorButtons) {
      button.classList[event.target == button ? 'add' : 'remove']('clicked')
    }

    const operator = event.target.textContent;
    state.operator = operator;
    state.justEvaluated = false;
  }

  function evaluateExpression(event) {
    console.log({firstNum: state.firstNum,
    secondNum: state.secondNum})
    if (state.secondNum === '0' && state.operator == '/') {
      app.display.textContent = 'ERROR';
      state.zeroError = true;
    } else if (state.firstNum != '' && state.secondNum != '' && state.operator) {
      const result = operate(state.operator, Number(state.firstNum), Number(state.secondNum));

      state.firstNum = result;
      state.operator = null;
      state.secondNum = '';
      app.display.textContent = result;

      unclickOperatorButtons();
      state.justEvaluated = true;
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
  }

  function addDecimal(event) {
    checkStates();
    appendChar(app.display.textContent === '' ? '0.' : '.');
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
})();