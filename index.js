const index = (() => {
  "use strict";

  const module = {};

  const historyCapacity = 50;
  const historyContainer = document.querySelector("#input");
  const errorElement = document.querySelector("#error");

  const validKeys = /^[\d\*\+\-\/\.]$/;
  const validOperations = /^[\*\+\-\/]$/;
  const validDigit = /^(\d*\.?\d+|\d+\.?\d*)$/;
  const computableForm = /^(\d*\.?\d+|\d+\.?\d*)[+\-*/](\d*\.?\d+|\d+\.?\d*)$/;
  const cursor = `<span id="cursor">_</span>`;

  let recordCount = historyContainer.childElementCount;
  let curRecordId = recordCount - 1;
  let curRecord = historyContainer.children[curRecordId];
  let curInnerHTML = curRecord.innerHTML;
  let operatorFlag = false;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const scroll = () => {
    let recordOffset = recordCount - curRecordId;
    let offset = `${recordOffset * 5}rem`;
    offset += ` + ${Math.max(recordOffset - 1, 0) * 1}vh`;

    historyContainer.style.transform = `translate(0, calc((${offset}) - 100%))`;
  };

  const scrollEH = (key) => {
    curRecord.style.transform = ``;
    curRecord.removeChild(curRecord.children[0]);

    if (key === "ArrowUp") {
      curRecordId--;
    } else if (key === "ArrowDown") {
      curRecordId++;
    }
    curRecordId = clamp(curRecordId, 0, recordCount - 1);
    scroll();
    curRecord = historyContainer.children[curRecordId];
    curInnerHTML = curRecord.innerHTML;

    curRecord.style.transform = `translate(3%, 0%) scale(1.1)`;
    curRecord.innerHTML += cursor;
  };

  const delBelow = () => {
    if (curRecordId != recordCount - 1) {
      const delId = curRecordId + 1;
      for (let i = delId; i < recordCount; i++) {
        const record = historyContainer.children[delId];
        historyContainer.removeChild(record);
      }
      recordCount = curRecordId + 1;
      scrollEH("ArrowDown");
    }
  }

  const delAbove = () => {
    if (recordCount > historyCapacity) {
      const delId = 1;
      for (let i = historyCapacity; i < recordCount; i++) {
        const record = historyContainer.children[delId];
        historyContainer.removeChild(record);
      }
      recordCount = historyCapacity;
      scrollEH("ArrowDown");
    }
  };
  
  const keyEH = (key) => {
    delBelow();

    if (validOperations.test(key)) {
      if (operatorFlag) {
        operatorFlag = false;
        enterEH(key);
        return;
      }
      operatorFlag = true;
    }
    
    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML + key;
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");

    hideError();

    delAbove();
  };

  const delEH = () => {
    delBelow();

    const lastKey = curInnerHTML[curInnerHTML.length - 1];
    if (validOperations.test(lastKey)) {
      operatorFlag = false;
    }

    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML.substring(0, curInnerHTML.length - 1);
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");

    hideError();

    delAbove();
  }

  const displayError = (errorMsg) => {
    errorElement.style.visibility = "visible";
    errorElement.innerHTML = "SYNTAX ERROR";
    if (!errorMsg) {
      errorElement.innerHTML = errorMsg;
    }
  };

  const hideError = () => {
    errorElement.style.visibility = "hidden";
  }

  const enterEH = (key) => {
    if (computableForm.test(curInnerHTML)) {
      // const {computedValue, errorMsg} =
      // if (!validDigit.test(curInnerHTML)) {
      //   return displayError(errorMsg);
      // } 
      
      // curInnerHTML = computedValue;
    }

    if (!validDigit.test(curInnerHTML)) {
      displayError(errorMsg);
      return;
    } 

    keyEH(key);
  };

  const inputEH = (e) => {
    const key = e.key;
    if (key.length === 1 && key.match(validKeys)) {
      keyEH(key);
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      scrollEH(key);
    } else if (key === "Backspace") {
      delEH();
    } else if (key === "Enter") {
      enterEH(``);
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", inputEH);
  });

  return module;
})();

/*

- figure out how to communicate between different files
- create separate file for doing the logic of computing 
- we will use split on it and guarantee correct form
- finish the parsing and computing of it
- connect it together and test
- add the edge case like divide by zero with snarky message


*/
