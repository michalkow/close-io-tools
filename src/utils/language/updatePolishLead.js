const getPolishCityNameForm = require('./getPolishCityNameForm');
const getPolishNameForm = require('./getPolishNameForm');
const getPolishNameGender = require('./getPolishNameGender');
const { leadCustomField, contactCustomField } = require('../../constants/close');
const updateLead = require('../../close/updateLead');
const processPromiseArray = require('../processPromiseArray');
const { get, compact } = require('lodash');

async function updateContacts(contacts = []) {
  return processPromiseArray(contacts.map(contact => async () => {
    const contactName = get(contact, 'name', '').split(' ')[0];
    const altNameForm = await getPolishNameForm(contactName);
    const gender = await getPolishNameGender(contactName);
    if (altNameForm && gender)      
      return Object.assign({}, contact, {
        [contactCustomField.CONTACT_GENDER.id]: gender,
        [contactCustomField.ALTERNATIVE_NAME.id]: altNameForm
      });
    return null;
  }));
}

async function updateLeadPolishForms(lead) {
  const data = {}; 
  const altCityName = await getPolishCityNameForm(get(lead, 'addresses[0].city'));
  if (altCityName)
    data[leadCustomField.ALTERNATIVE_CITY.id] = altCityName;
  const updatedContacts = compact(await updateContacts(lead.contacts))
  if (updatedContacts.length)
    data.contacts = updatedContacts;
  const update = Object.assign({}, { id: lead.id }, data)
  return updateLead(update);
}

module.exports = updateLeadPolishForms;