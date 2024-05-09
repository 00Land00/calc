const index = (() => {
  "use strict";

  const module = {};

  const historyCapacity = 50;
  const historyContainer = document.querySelector("#input");
  // make reference to the error message

  const validKeys = /[\d\*\+\-\/\.]/;
  const validOperations = /[\*\+\-\/]/;
  const validDigit = /^(\d*\.?\d+|\d+\.?\d*)$/;
  const computableForm = /^(\d*\.?\d+|\d+\.?\d*)[+\-*/](\d*\.?\d+|\d+\.?\d*)$/;
  const cursor = `<span id="cursor">_</span>`;

  let recordCount = historyContainer.childElementCount;
  let curRecordId = recordCount - 1;
  let curRecord = historyContainer.children[curRecordId];
  let curInnerHTML = curRecord.innerHTML;

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
    // verify that it is valid and that requires some context
    // because i want to prevent adding a symbol when there is no digit in the LHS
    // i need to ensure the user can only type one symbol. that they cannot type symbols until there is a digit
    // are there any other explicit checks? oh frick i forgot dots too
    
    // actually. let them have it. we got the error to say when they do, and the means to check when they do try.


    delBelow();

    
    // this is where we check
    // we first see if it's an operator. then we check if it's in a compatible form
    // if so: we compute it with calculator logic
    // if it fails to compute, display given error message or default syntax error
    // otherwise: we do below. 
    
    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML + key;
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");

    // say we had an error message
    // so it's flashing
    // when user presses a key and gets here. we know they changed it
    // or at least isn't computing it again
    // so we can turn off the error message here

    delAbove();
  };

  const delEH = () => {
    delBelow();

    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML.substring(0, curInnerHTML.length - 1);
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");

    // remove error message here too if it's flashing

    delAbove();
  }

  const inputEH = (e) => {
    const key = e.key;
    if (key.length === 1 && key.match(validKeys)) {
      keyEH(key);
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      scrollEH(key);
    } else if (key === "Backspace") {
      delEH();
    } else if (key === "Enter") {
      // in a separate function but basically:
      // delBelow()
      // check if of the computableForm. if so, compute
      // otherwise: ensure it's a valid digit, then we just copy it
      // otherwise pull up syntax error
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", inputEH);
  });

  return module;
})();

/*

- reference error html
- complete Enter logic
- add the way to remove the error message
- figure out how to communicate between different files
- create separate file for doing the logic of computing 
- we will use split on it and guarantee correct form
- finish the parsing and computing of it
- connect it together and test
- add the edge case like divide by zero with snarky message


*/
