const calculator = (() => {
  "use strict";

  const module = {};

  const computableForm = /^(\d*\.?\d+|\d+\.?\d*)[+\-*/](\d*\.?\d+|\d+\.?\d*)$/;
  const validOperations = /[\*\+\-\/]/;

  const errorObj = { computedValue: null, errorMsg: "SYNTAX ERROR" };

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const add = (x, y) => {
    let result = round(x + y);
    return { computedValue: result.toString(), errorMsg: `` };
  };

  const sub = (x, y) => {
    let result = round(x - y);
    return { computedValue: result.toString(), errorMsg: `` };
  };

  const mult = (x, y) => {
    let result = round(x * y);
    return { computedValue: result.toString(), errorMsg: `` };
  };

  const div = (x, y) => {
    if (!y) {
      return { computedValue: null, errorMsg: "Ok buddy, nice try." };
    }

    let result = round(x / y);
    return { computedValue: result.toString(), errorMsg: `` };
  };

  module.compute = (inputStr) => {
    if (!computableForm.test(inputStr)) {
      return errorObj;
    }

    const operandStrs = inputStr.split(validOperations);
    const operator = inputStr.match(validOperations);
    const operands = operandStrs.map((operand) => parseFloat(operand));

    if (operator === "+") {
      return add(operands[0], operands[1]);
    } else if (operator === "-") {
      return sub(operands[0], operands[1]);
    } else if (operator === "*") {
      return mult(operands[0], operands[1]);
    } else if (operator === "/") {
      return div(operands[0], operands[1]);
    } else {
      return errorObj;
    }
  };

  return module;
})();
