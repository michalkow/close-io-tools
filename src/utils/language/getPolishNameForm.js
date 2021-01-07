const findCsvRow = require('../findCsvRow');
const { dictFilename, formNameField } = require('../../constants/utils');
const { capitalize } = require('lodash');

const dictPath = 'dict/'

async function getPolishNameForm(name) {
  if (!name)
    return null;
  const caseName = name.toUpperCase();
  const match = (row) => row[formNameField.BASE].toUpperCase() === caseName;
  const row = findCsvRow(dictPath + dictFilename.POLISH_NAME_FORM, match)
  return row && row[formNameField.TARGET] && capitalize(row[formNameField.TARGET]);
}

module.exports = getPolishNameForm;