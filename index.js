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
      return b ? divide(a, b) : null; // if statement is to prevent a division by zero error
    case "^":
      return power(a, b);
  }
  return null;
}

let prevNum = ""; // previous number
let operator = ""; // current operator
let num = "0"; // current number

const numbers = document.querySelectorAll(".number"); // all of the number buttons
const operations = document.querySelectorAll(".operator"); // all of the operations buttons
const del = document.querySelector("#delete"); // delete button
const clr = document.querySelector("#clear"); // clear button
const dec = document.querySelector(".decimal"); // decimal button
const lower = document.querySelector(".lower"); // lower display
const upper = document.querySelector(".upper"); // upper display
const equ = document.querySelector(".equals"); // equal button

// adds a number to the current number
function numberAdd(number) {
  num = +num || num.length > 1 ? num += number : number; // makes 06 turn into 6
  lower.textContent = num; // updates display
}

numbers.forEach(btn => {
  btn.addEventListener("click", e => numberAdd(e.target.dataset.number))
})

// deletes the last value in the current number string
function dele() {
  num = num.replace(/.$/, '');
  if (num.length == 0) num = "0";
  lower.textContent = num; // updates display
}

del.addEventListener("click", dele);

// resets all of the variables
function clearCalc() {
  prevNum = "";
  operator = "";
  num = "0";
  upper.textContent = ""; // clears display
  lower.textContent = num; // updates display
}

clr.addEventListener("click", clearCalc);

// formats display to give solution and resets variables
function equals() {
  let temp = Math.round(+prevNum * 100000) / 100000;
  if (prevNum === "") {
    prevNum = num;
    num = "";
  }
  else if (num !== "" && operator !== "") {
    upper.textContent = `${temp} ${operator} ${Math.round(+num * 100000) / 100000} =`; // updates display
    num = Math.round(+operate(operator, prevNum, num) * 100000) / 100000;
    lower.textContent = num; // updates display
    prevNum = "";
    prevOp = "";
    operator = "";
  }
}

equ.addEventListener("click", equals)

// adds decimal point to the current number
function decimal() {
  if (num.split(".").length == 2) {
    return;
  }
  if (num.length == 0) num = "0";
  num += ".";
  lower.textContent = num; // updates display
}

dec.addEventListener("click", decimal)

// updates the operator and computes the output 
function oper(op) {
  lower.textContent = op;
  if (prevNum === "") {
    prevNum = num;
    num = "";
  }
  else if (num !== "" && operator !== "") {
    prevNum = operate(operator, prevNum, num);
    num = "";
    lower.textContent = Math.round(+prevNum * 100000) / 100000; // updates display
  }
  operator = op;
  upper.textContent = `${Math.round(+prevNum * 100000) / 100000} ${operator}`; // updates display
}

operations.forEach(btn => {
  btn.addEventListener("click", e => oper(e.target.dataset.op));
})

// manages keyboard inputs
function action(e) {
  let key = e.key;
  if (key == "Backspace") dele();
  else if (key == "Clear") clearCalc();
  else if (key === ".") decimal();
  else if (+key == key) numberAdd(key);
  else if (key === "=" || key == "Enter") equals();
  switch (key) {
    case "/":
      return oper("÷");
    case "*":
      return oper("×");
    case "+":
      return oper("+");
    case "-":
      return oper("-");
    case "^":
      return oper("^");
  }
}

window.addEventListener('keydown', action);