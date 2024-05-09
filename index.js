const index = (() => {
  "use strict";

  const module = {};

  const historyContainer = document.querySelector("#input");

  const validKeys = /[\d\*\+\-\/]/;
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
  
  const keyEH = (key) => {
    delBelow();

    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML + key;
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");
  };

  const delEH = () => {
    delBelow();

    const copy = document.createElement("div");
    copy.innerHTML = curInnerHTML.substring(0, curInnerHTML.length - 1);
    historyContainer.appendChild(copy);
    recordCount++;
    scrollEH("ArrowDown");
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

    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    scrollEH("ArrowDown"); // temp
    window.addEventListener("keydown", inputEH);
  });

  return module;
})();

/* 

- toggle everything back on
- verify that things don't break
- add displaying each keypress
- add logic to remove oldest message

- and have it finally add every valid keypress and ensure it doesn't
  break when i update the childCount

  - add logic to have the cursor move to what you focus and if you type
  - it removes everything at the bottom


- create separate file for doing the logic of computing 

- let's get the actual calculator logic working
- let's address the error handling
- let's add decimal points to the mix

*/
