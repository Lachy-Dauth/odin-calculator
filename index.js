// returns the sum two numbers
function add(a, b) {
	return a + b;
};

// returns the difference of two numbers
function subtract(a, b) {
	return a - b;
};

// returns the product of two numbers
function multiply(a, b) {
	return a * b;
};

// returns the quotient of two numbers
function divide(a, b) {
	return a / b;
};

// returns the output of a to the power of b
const power = function(a, b) {
  return a ** b;
};

// takes an operator and 2 numbers and then calls one of the above functions on the numbers
function operate(operation, a, b) {
  // making a and b numbers
  a = +a;
  b = +b;
  switch (operation){
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return b ? null : divide(a, b); // if statement is to prevent a division by zero error
    case "^":
      return power(a, b);
  }
  return null;
}

