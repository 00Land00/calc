const index = (() => {
  "use strict";

  const module = {};

  const container = document.querySelector("#input");
  const inputText = document.querySelector("#text");
  const cursorText = document.querySelector("#cursor");
  const child = document.querySelector("#child");

  const validKeys = /[\d\*\+\-\/]/;
  let childCount = child.childElementCount;
  let curScroll = 1;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  module.setScroll = (val) => {
    curScroll = clamp(val, 1, childCount);
    child.style.transform = `translate(0, calc(${curScroll * 5}rem - 100%))`;
  };

  module.backspaceCheck = (key) => {
    if (key === "Backspace" && inputText.innerHTML.length > 0) {
      inputText.innerHTML = inputText.innerHTML.substring(
        0,
        inputText.innerHTML.length - 1
      );
    }
  };

  module.validKeyCheck = (key) => {
    if (key.length === 1 && key.match(validKeys)) {
      // i would put the text up here
      inputText.innerHTML += key;
    }
  };

  module.controlsCheck = (key) => {
    if (key === "ArrowUp") {
      curScroll++;
      module.setScroll(curScroll);
    }
    if (key === "ArrowDown") {
      curScroll--;
      module.setScroll(curScroll);
    }
  };

  const scrollEH = (e) => {
    let y = e.deltaY;
    curScroll += y;

    module.setScroll(curScroll);
  };

  const typingEH = (e) => {
    module.validKeyCheck(e.key);
    module.backspaceCheck(e.key);
    module.controlsCheck(e.key);
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", typingEH);
    window.addEventListener("wheel", scrollEH);
  });

  return module;
})();

/* 

- let's get displaying each keystroke as being displayed above
  - this is the hardest part
  - how do we get the flexbox to make it like that
  - i also want it to stick when you scroll
  - and only move down when i scroll up
  - flexbox is sized to the content


- let's get the actual calculator logic working
- let's address the error handling
- let's add decimal points to the mix

*/
