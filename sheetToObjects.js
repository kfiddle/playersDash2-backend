const sheetToObjects = (fullSpreadsheet) => {
  const propsRow = fullSpreadsheet.shift();

  return fullSpreadsheet.reduce((list, nextRow) => {
    let ob = {};
    for (let j = 0; j < nextRow.length; j++) {
      ob[propsRow[j]] = nextRow[j];
    }
    list.push(ob);
    return list;
  }, []);
};

module.exports = sheetToObjects;
