const keyIndex = (() => {
  "use strict";

  const module = {};

  const maxCapacity = 50;

  const cursor = `<span id="cursor">_</span>`;
  let curMetaRecord = recordIndex.getRecord().metaData;
  let curHtmlRecord = recordIndex.getRecord().html;
  let curInnerHTML = curHtmlRecord.innerHTML;

  const ops = /[\+\-\*\/]/;

  const compute = (key) => {
    const { computedValue, errorMsg } = calculator.compute(curInnerHTML);
    if (computedValue === null) {
      errorIndex.displayError(errorMsg);
      return { newStr: null, pathList: null, opFlag: null };
    }

    const pathList = pathIndex.constructPath(computedValue);
    return processKey(computedValue, key, pathList, false);
  };

  const computeCheck = (
    recordObj,
    key,
    nextPath,
    opFlag = curMetaRecord.opFlag
  ) => {
    if (nextPath === "bp") {
      if (opFlag) {
        return compute(key);
      }
      recordObj.opFlag = true;
    }

    return recordObj;
  };

  const processKey = (str, key, pathList, opFlag = curMetaRecord.opFlag) => {
    let pathListCopy = [...pathList];
    const lastPath = pathListCopy[pathListCopy.length - 1];
    const pathFn = pathIndex.pathMap[lastPath];
    let { newStr, nextPath } = pathFn(str, key);
    if (key !== `` && newStr === str) {
      newStr = null;
      pathListCopy = null;
      opFlag = null;
      nextPath = null;
    }
    if (nextPath !== null) {
      pathListCopy.push(nextPath);
    }

    const recordObj = computeCheck(
      { newStr: newStr, pathList: pathListCopy, opFlag },
      key,
      nextPath,
      opFlag
    );

    return {
      newStr: recordObj.newStr,
      pathList: recordObj.pathList,
      opFlag: recordObj.opFlag,
    };
  };

  const deleteKey = () => {
    const newStr = curInnerHTML.substring(0, curInnerHTML.length - 1);
    const pathList = [...curMetaRecord.pathList];
    const lastPath = pathList.pop();
    let opFlag = curMetaRecord.opFlag;
    if (lastPath === "bp") {
      opFlag = false;
    }

    return {
      newStr,
      pathList,
      opFlag,
    };
  };

  const clearBelow = () => {
    const recordCount = recordIndex.getCount();
    const curRecordId = recordIndex.getCurRecordId();
    if (curRecordId !== recordCount - 1) {
      const targetId = curRecordId + 1;
      for (let i = targetId; i < recordCount; i++) {
        recordIndex.deleteRecord(targetId);
      }

      scrollIndex.scrollEH("ArrowDown");
    }
  };

  const removeOldest = () => {
    const recordCount = recordIndex.getCount();
    if (recordCount > maxCapacity) {
      const targetId = 1;
      for (let i = maxCapacity; i < recordCount; i++) {
        recordIndex.deleteRecord(targetId);
      }

      scrollIndex.scrollEH("ArrowDown");
    }
  };

  const displayKey = (curInnerHTML, pathList, opFlag) => {
    clearBelow();

    recordIndex.addRecord(curInnerHTML, pathList, opFlag);
    scrollIndex.scrollEH("ArrowDown");

    removeOldest();
  };

  const getCurRecordInfo = () => {
    curMetaRecord = recordIndex.getRecord().metaData;
    curHtmlRecord = recordIndex.getRecord().html;
    curHtmlRecord.removeChild(curHtmlRecord.children[0]);
    curInnerHTML = curHtmlRecord.innerHTML;
    curHtmlRecord.innerHTML += cursor;
  };

  module.keyEH = (key) => {
    getCurRecordInfo();

    const recordObj = processKey(curInnerHTML, key, curMetaRecord.pathList);
    if (!recordObj.newStr) {
      return;
    }
    errorIndex.hideError();

    displayKey(recordObj.newStr, recordObj.pathList, recordObj.opFlag);
  };

  module.bsEH = () => {
    getCurRecordInfo();
    if (!curInnerHTML.length) {
      return;
    }
    errorIndex.hideError();

    const recordObj = deleteKey();
    displayKey(recordObj.newStr, recordObj.pathList, recordObj.opFlag);
  };

  module.enterEH = () => {
    getCurRecordInfo();
    if (!curInnerHTML.length) {
      return;
    }

    const recordObj = compute(``);
    if (!recordObj.newStr) {
      return;
    }
    errorIndex.hideError();

    displayKey(recordObj.newStr, recordObj.pathList, recordObj.opFlag);
  };

  return module;
})();
