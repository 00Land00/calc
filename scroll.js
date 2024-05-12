const scrollIndex = (() => {
  "use strict";

  const module = {};

  const cursor = `<span id="cursor">_</span>`;
  let curRecord = recordIndex.getRecord().html;

  const focus = () => {
    curRecord.style.transform = `translate(3%, 0%) scale(1.1)`;
    curRecord.innerHTML += cursor;
  };

  const unfocus = () => {
    curRecord.style.transform = ``;
    curRecord.removeChild(curRecord.children[0]);
  };

  const scrollRecordId = (key) => {
    let curRecordId = recordIndex.getCurRecordId();
    if (key === "ArrowUp") {
      curRecordId = recordIndex.updateCurRecordId(curRecordId - 1);
    }
    if (key === "ArrowDown") {
      curRecordId = recordIndex.updateCurRecordId(curRecordId + 1);
    }
  };

  const scroll = () => {
    const curRecordId = recordIndex.getCurRecordId();
    const recordCount = recordIndex.getCount();
    const recordOffset = recordCount - curRecordId;
    let offset = `${recordOffset * 5}rem`;
    offset += ` + ${Math.max(recordOffset - 1, 0) * 1}vh`;

    const htmlContainer = recordIndex.getHtmlContainer();
    htmlContainer.style.transform = `translate(0, calc((${offset}) - 100%))`;
  };

  module.scrollEH = (key) => {
    errorIndex.hideError();
    unfocus();

    scrollRecordId(key);
    scroll();
    curRecord = recordIndex.getRecord().html;

    focus();
  };

  return module;
})();
