'use strict';

function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function divide(a: number, b: number) {
  return a / b;
}

function factorial(num: number) {
  let tmp = num;

  if (num < 0) {
    return -1;
  }
  if (num === 0) {
    return 1;
  }

  while (num > 2) {
    tmp *= num;
    num -= 1;
  }

  return tmp;
}

function addWithLoopCount(count: number, a: number, b: number) {
  let i = 0;
  for (; i < count; i += 1) {
    add(a, b);
  }
}

function subtractWithLoopCount(count: number, a: number, b: number) {
  let i = 0;
  for (; i < count; i += 1) {
    subtract(a, b);
  }
}

function multiplyWithLoopCount(count: number, a: number, b: number) {
  let i = 0;
  for (; i < count; i += 1) {
    multiply(a, b);
  }
}

function divideWithLoopCount(count: number, a: number, b: number) {
  let i = 0;
  for (; i < count; i += 1) {
    divide(a, b);
  }
}

function factorialWithLoopCount(count: number, num: number) {
  let i = 0;
  for (; i < count; i += 1) {
    factorial(num);
  }
}

export default {
  add,
  addWithLoopCount,
  divide,
  divideWithLoopCount,
  factorial,
  factorialWithLoopCount,
  multiply,
  multiplyWithLoopCount,
  subtract,
  subtractWithLoopCount,
};
