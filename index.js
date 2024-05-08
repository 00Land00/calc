const index = (() => {
  "use strict";

  const module = {};

  const inputText = document.querySelector("#input");

  const validKeys = /[\d\*\+\-\/]/;
  let inputCount = inputText.childElementCount;
  let childOffset = 1;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  module.setScroll = (val) => {
    childOffset = clamp(val, 1, inputCount);
    let offset = `${childOffset * 5}rem`; // offset by the flex elements
    offset += ` + ${Math.max(childOffset - 1, 0) * 1}vh`; // include the offset from the gaps
    inputText.style.transform = `translate(0, calc((${offset}) - 100%))`;
  };

  // module.backspaceCheck = (key) => {
  //   if (key === "Backspace" && inputText.innerHTML.length > 0) {
  //     inputText.innerHTML = inputText.innerHTML.substring(
  //       0,
  //       inputText.innerHTML.length - 1
  //     );
  //   }
  // };

  // module.validKeyCheck = (key) => {
  //   if (key.length === 1 && key.match(validKeys)) {
  //     // i would put the text up here
  //     inputText.innerHTML += key;
  //   }
  // };

  module.controlsCheck = (key) => {
    inputText.children[inputCount - childOffset].style.transform = ``;
    if (key === "ArrowUp") {
      childOffset++;
      module.setScroll(childOffset);
    }
    if (key === "ArrowDown") {
      childOffset--;
      module.setScroll(childOffset);
    }
    inputText.children[inputCount - childOffset].style.transform = `translate(3%, 0%) scale(1.1)`;
  };

  const typingEH = (e) => {
    // module.validKeyCheck(e.key);
    // module.backspaceCheck(e.key);
    module.controlsCheck(e.key);
  };

  window.addEventListener("DOMContentLoaded", () => {
    inputText.children[inputCount - childOffset].style.transform = `translate(3%, 0%) scale(1.1)`;
    window.addEventListener("keydown", typingEH);
  });

  return module;
})();

/* 

- i want the focus to increase in size and smoothly increase or decrease
  as it enters focus
- and have it finally add every valid keypress and ensure it doesn't
  break when i update the childCount

- let's get the actual calculator logic working
- let's address the error handling
- let's add decimal points to the mix

*/
