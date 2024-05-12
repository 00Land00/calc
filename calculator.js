const calculator = (() => {
  "use strict";

  const module = {};

  const computableForm =
    /^(\-?\d*\.?\d+|\-?\d+\.?\d*)[+\-*/](\-?\d*\.?\d+|\-?\d+\.?\d*)$/;
  const validDigit = /^(\-?\d*\.?\d+|\-?\d+\.?\d*)$/;
  const validOperations = /[\*\+\-\/]/g;

  const errorObj = { computedValue: null, errorMsg: "SYNTAX ERROR" };

  const roundTo = 4; // 4 decimal places
  const round = (num) => {
    const factor = 10 ** roundTo;
    return Math.round((num + Number.EPSILON) * factor) / factor;
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
    if (!computableForm.test(inputStr) && !validDigit.test(inputStr)) {
      return errorObj;
    }

    const curMetaRecord = recordIndex.getRecord().metaData;

    const opFlag = curMetaRecord.opFlag;
    if (!opFlag) {
      return {
        computedValue: inputStr,
        errorMsg: ``,
      };
    }

    const opIndex = curMetaRecord.pathList.findLastIndex((path) => path === "bp") - 1;
    const operator = inputStr[opIndex];

    const operands = [
      parseFloat(inputStr.substring(0, opIndex)),
      parseFloat(inputStr.substring(opIndex + 1, inputStr.length)),
    ];

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
