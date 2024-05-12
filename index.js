const index = (() => {
  "use strict";

  const module = {};

  const validKeys = /^[\d\*\+\-\/\.]$/;

  const inputEH = (e) => {
    const key = e.key;
    if (key.length === 1 && key.match(validKeys)) {
      keyIndex.keyEH(key);
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      scrollIndex.scrollEH(key);
    } else if (key === "Enter") {
      keyIndex.enterEH();
    } else if (key === "Backspace") {
      keyIndex.bsEH();
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", inputEH);
  });

  return module;
})();