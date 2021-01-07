const findCsvRow = require('../findCsvRow');
const { dictFilename, genderNameField } = require('../../constants/utils');
const { contactCustomField } = require('../../constants/close');

const dictPath = 'dict/'

async function getPolishNameGender(name) {
  if (!name) 
    return null;
  const caseName = name.toUpperCase();
  const match = { [genderNameField.FIRST_NAME]: caseName };
  const maleMatch = await findCsvRow(dictPath + dictFilename.POLISH_MALE_NAMES, match);
  const femaleMatch = await findCsvRow(dictPath + dictFilename.POLISH_FEMALE_NAMES, match);
  if (maleMatch && femaleMatch)
    return maleMatch[genderNameField.COUNT] >= femaleMatch[genderNameField.COUNT] ?
      contactCustomField.CONTACT_GENDER.options.MALE :
      contactCustomField.CONTACT_GENDER.options.FEMALE
  if (maleMatch)
    return contactCustomField.CONTACT_GENDER.options.MALE;
  if (femaleMatch)
    return contactCustomField.CONTACT_GENDER.options.FEMALE;
  return null;
}

module.exports = getPolishNameGender;