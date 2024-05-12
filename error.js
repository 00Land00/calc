const errorIndex = (() => {
  "use strict";

  const module = {};

  const errorElement = document.querySelector("#error");

  module.displayError = (errorMsg) => {
    errorElement.style.visibility = "visible";
    errorElement.innerHTML = "SYNTAX ERROR";
    if (errorMsg) {
      errorElement.innerHTML = errorMsg;
    }
  };

  module.hideError = () => {
    errorElement.style.visibility = "hidden";
  }
  
  return module;
})();