const dictFilename = {
  POLISH_NAME_FORM: 'PoliMorf-0.6.7.tab.csv',
  POLISH_FEMALE_NAMES: 'lista_imion_żeńskich_os_żyjące_2020-01-21.csv',
  POLISH_MALE_NAMES: 'lista_imion_męskich_os_żyjące_2020-01-21.csv',
  POLISH_CITY_FORMS: 'city_forms.csv',
}

const genderNameField = {
  FIRST_NAME: 'IMIĘ_PIERWSZE',
  COUNT: 'LICZBA_WYSTĄPIEŃ'
}

const formNameField = {
  BASE: 'BASE',
  TARGET: 'TARGET'
}

const cityNameField = {
  BASE: 'BASE',
  TARGET: 'TARGET'
}

module.exports = {
  dictFilename,
  genderNameField,
  formNameField,
  cityNameField
};