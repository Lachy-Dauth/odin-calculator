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

let prevNum = "";
let prevOp = "";
let operator = "";
let num = "0";

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const del = document.querySelector("#delete");
const clr = document.querySelector("#clear");
const dec = document.querySelector(".decimal");
const lower = document.querySelector(".lower");
const upper = document.querySelector(".upper");
const equ = document.querySelector(".equals");

numbers.forEach(btn => {
  btn.addEventListener("click", e => {
    num = +num || num.length > 1 ? num += e.target.dataset.number : e.target.dataset.number;
    lower.textContent = Math.round(+num * 100000) / 100000;
  })
})

del.addEventListener("click", e => {
  num = num.replace(/.$/, '');
  if (num.length == 0) num = "0";
  lower.textContent = Math.round(+num * 100000) / 100000;
})

clr.addEventListener("click", e => {
  prevNum = "";
  prevOp = "";
  operator = "";
  num = "0";
  upper.textContent = "";
  lower.textContent = Math.round(+num * 100000) / 100000;
})

equ.addEventListener("click", e => {
  let temp = Math.round(+prevNum * 100000) / 100000;
  if (prevNum === "") {
    prevNum = num;
    num = "";
  }
  else if (num !== "" && operator !== "") {
    num = operate(operator, prevNum, num);
    lower.textContent = Math.round(+num * 100000) / 100000;
    upper.textContent = `${temp} ${operator} ${Math.round(+prevNum * 100000) / 100000} =`;
    prevNum = "";
    prevOp = "";
    operator = "";
  }
})

dec.addEventListener("click", e => {
  if (num.split(".").length == 2) {
    return;
  }
  if (num.length == 0) num = "0";
  num += ".";
  lower.textContent = Math.round(+num * 100000) / 100000;
})

operations.forEach(btn => {
  btn.addEventListener("click", e => {
    if (prevNum === "") {
      prevNum = num;
      num = "";
    }
    else if (num !== "" && operator !== "") {
      prevNum = operate(operator, prevNum, num);
      num = "";
      lower.textContent = Math.round(+prevNum * 100000) / 100000;
    }
    operator = e.target.dataset.op;
    upper.textContent = `${Math.round(+prevNum * 100000) / 100000} ${operator}`;
  })
})