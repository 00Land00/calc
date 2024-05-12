const pathIndex = (() => {
  "use strict";

  const module = {};

  const ops = /[\+\-\*\/]/;
  const isOp = (key) => ops.test(key);

  const neg = /\-/;
  const isNeg = (key) => neg.test(key);

  const zero = /0/;
  const isZero = (key) => zero.test(key);

  const digit = /[1-9]/;
  const isDigit = (key) => digit.test(key);

  const digitPlus = /\d/;
  const isDigitPlus = (key) => digitPlus.test(key);

  const dot = /\./;
  const isDot = (key) => dot.test(key);

  const pathOutput = (str, key, nextPath, replace = false) => {
    if (replace) {
      let newStr = str.substring(0, str.length - 1) + key;
      return {
        newStr,
        nextPath,
      };
    }

    return {
      newStr: str + key,
      nextPath: nextPath,
    };
  };

  const emptyDotRegex = /^(\-?\.[\+\-\*\/]|[\d\.\-]+[\+\-\*\/]\-?\.)$/;
  const ifOp = (result, str, key, nextPath = "bp") => {
    if (isOp(key)) {
      if (!emptyDotRegex.test(str + key)) {
        result = pathOutput(str, key, nextPath);
      }
    }

    return result;
  };

  const beginPath = (str, key) => {
    let result = pathOutput(str, ``, null);
    result = isNeg(key) ? pathOutput(str, key, "np") : result;
    result = isZero(key) ? pathOutput(str, key, "zp") : result;
    result = isDigit(key) ? pathOutput(str, key, "Dp") : result;
    result = isDot(key) ? pathOutput(str, key, "dp") : result;
    return result;
  };

  const negPath = (str, key) => {
    let result = pathOutput(str, ``, null);
    result = isZero(key) ? pathOutput(str, key, "zp") : result;
    result = isDigit(key) ? pathOutput(str, key, "Dp") : result;
    result = isDot(key) ? pathOutput(str, key, "dp") : result;
    return result;
  };

  const zeroPath = (str, key) => {
    let result = pathOutput(str, ``, null);
    result = ifOp(result, str, key);
    result = isDigit(key) ? pathOutput(str, key, "Dp", true) : result;
    result = isDot(key) ? pathOutput(str, key, "dp") : result;
    return result;
  };

  const digitPath = (str, key) => {
    let result = pathOutput(str, ``, null);
    result = ifOp(result, str, key);
    result = isDigitPlus(key) ? pathOutput(str, key, "Dp") : result;
    result = isDot(key) ? pathOutput(str, key, "dp") : result;
    return result;
  }

  const dotPath = (str, key) => {
    let result = pathOutput(str, ``, null);
    result = ifOp(result, str, key);
    result = isDigitPlus(key) ? pathOutput(str, key, "dp") : result;
    return result;
  };

  module.pathMap = {
    "bp": beginPath,
    "np": negPath,
    "zp": zeroPath,
    "Dp": digitPath,
    "dp": dotPath,
  };

  module.constructPath = (str) => {
    const pathList = ["bp"];
    let curStr = "";
    for (let i = 0; i < str.length; i++) {
      let lastPath = pathList[pathList.length - 1];
      let pathFn = module.pathMap[lastPath];
      let {newStr, nextPath} = pathFn(curStr, str[i]);

      curStr = newStr;
      pathList.push(nextPath);
    }

    return pathList;
  };

  return module;
})();
