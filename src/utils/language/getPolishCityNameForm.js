const findCsvRow = require('../findCsvRow');
const { dictFilename, cityNameField } = require('../../constants/utils');

const dictPath = 'dict/'

async function getPolishCityNameForm(name) {
  if (!name)
    return null;
  const caseName = name.toUpperCase();
  const match = (row) => row[cityNameField.BASE].toUpperCase() === caseName;
  const row = await findCsvRow(dictPath + dictFilename.POLISH_CITY_FORMS, match);
  return row && row[cityNameField.TARGET];
}

module.exports = getPolishCityNameForm;