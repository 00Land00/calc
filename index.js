const index = (() => {
  "use strict";

  const module = {};

  const container = document.querySelector("#input");
  const inputText = document.querySelector("#text");
  const cursorText = document.querySelector("#cursor");

  const validKeys = /[\d\*\+\-\/]/;

  const typingEH = (e) => {
    if (e.key.length === 1 && e.key.match(validKeys)) {
      inputText.innerHTML += e.key;
    }

    if (e.key === "Backspace" && inputText.innerHTML.length > 0) {
      inputText.innerHTML = inputText.innerHTML.substring(
        0,
        inputText.innerHTML.length - 1
      );
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", typingEH);
  });

  return module;
})();

/* 

- let's get displaying each keystroke as being displayed above
- let's get the actual calculator logic working
- let's address the error handling
- let's add decimal points to the mix

*/
