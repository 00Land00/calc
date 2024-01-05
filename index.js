const index = (() => {
  "use strict";

  const module = {};

  const inputText = document.querySelector("#input");
  const cursorText = document.querySelector("#cursor");

  window.addEventListener("DOMContentLoaded", () => {
    inputText.appendChild(cursorText);
  });

  return module;
})();
