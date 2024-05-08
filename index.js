const index = (() => {
  "use strict";

  const module = {};

  const inputText = document.querySelector("#input");

  const validKeys = /[\d\*\+\-\/]/;
  let inputCount = inputText.childElementCount;
  let curScroll = 1;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const scrollToId = (val) => {
    let scrollVal = val - 1;
    return inputCount - (scrollVal + 1);
  };

  module.setScroll = (val) => {
    curScroll = clamp(val, 1, inputCount);
    let offset = `${curScroll * 5}rem`;
    offset += ` + ${Math.max(curScroll - 1, 0) * 5}vh`;
    inputText.style.transform = `translate(0, calc((${offset}) - 100%))`;
    // curScroll => is how we get the list of 
    inputText.children[scrollToId(curScroll)].style.backgroundColor = `yellow`;
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
    // module.validKeyCheck(e.key);
    // module.backspaceCheck(e.key);
    module.controlsCheck(e.key);
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", typingEH);
    window.addEventListener("wheel", scrollEH);
  });

  return module;
})();

/* 

- i want the focus to increase in size and smoothly increase or decrease
  as it enters focus
- then i have to get the cursor to follow the focus
- and have it finally add every valid keypress and ensure it doesn't
  break when i update the childCount

- let's get the actual calculator logic working
- let's address the error handling
- let's add decimal points to the mix

*/
