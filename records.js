const recordIndex = (() => {
  "use strict";

  const module = {};

  const records = {
    curRecordId: 0,
    count: 1,
    htmlContainer: document.querySelector("#input"),
    metaData: [{
      pathList: ["bp"],
      opFlag: false,
    }],
  };

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const addMetaRecord = (pathList, opFlag) => {
    const newMetaRecord = {
      pathList, opFlag
    };
    records.metaData.push(newMetaRecord);
  };

  const addHtmlRecord = (innerHTML) => {
    const newHtmlElement = document.createElement("div");
    newHtmlElement.innerHTML = innerHTML;
    records.htmlContainer.appendChild(newHtmlElement);
  };

  module.addRecord = (innerHTML, pathList, opFlag) => {
    addHtmlRecord(innerHTML);
    addMetaRecord(pathList, opFlag);
    records.count++;
  };

  module.getRecord = (id = records.curRecordId) => {
    return {
      html: records.htmlContainer.children[id],
      metaData: records.metaData[id],
    };
  };

  module.getHtmlContainer = () => {
    return records.htmlContainer;
  }

  module.getCurRecordId = () => {
    return records.curRecordId;
  };

  module.getCount = () => {
    return records.count;
  };

  module.updateMetaRecord = (pathList, opFlag, id = records.curRecordId) => {
    const metaRecord = records.metaData[id];
    if (pathList) {
      metaRecord.pathList = pathList;
    }
    
    metaRecord.opFlag = opFlag ? true : false;
  };

  module.updateHtmlRecord = (innerHTML, id = records.curRecordId) => {
    const htmlElement = records.htmlContainer.children[id];
    htmlElement.innerHTML = innerHTML;
  };

  module.updateRecord = (innerHTML, pathList, opFlag, id = records.curRecordId) => {
    updateHtmlRecord(innerHTML);
    updateMetaRecord(pathList, opFlag);
  };

  module.updateCurRecordId = (newId) => {
    records.curRecordId = clamp(newId, 0, records.count - 1);
    return records.curRecordId;
  };

  const deleteMetaRecord = (id = records.curRecordId) => {
    let targetId = clamp(id, 0, records.count - 1);
    records.metaData.splice(targetId, 1);
  };

  const deleteHtmlRecord = (id = records.curRecordId) => {
    let targetId = clamp(id, 0, records.count - 1);
    const htmlElement = records.htmlContainer.children[targetId];
    records.htmlContainer.removeChild(htmlElement);
  };

  module.deleteRecord = (id = records.curRecordId) => {
    deleteMetaRecord(id);
    deleteHtmlRecord(id);
    records.count--;
  };

  return module;
})();