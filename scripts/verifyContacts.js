const searchLeads = require('../src/close/searchLeads');
const updateContact = require('../src/close/updateContact');
const processPromiseArray = require('../src/utils/processPromiseArray');
const getEmailStatusFromGMass = require('../src/utils/getEmailStatusFromGMass');
const { filter } = require('lodash');
const { contactCustomField } = require('../src/constants/close');

async function verifyContact(contact, { dryRun }) {
  if (!contact.emails[0])
    return false;
  const emailStatus = await getEmailStatusFromGMass(contact.emails[0].email)
  const updateData = Object.assign({}, { id: contact.id }, emailStatus)
  return updateContact(updateData, { dryRun });
}

async function findContacts(lead, { debug, dryRun }) {
  if (debug)
    console.count();
  if (!lead.contacts || !lead.contacts.length)
    return [];
  const unverifiedContacts = filter(lead.contacts, contact => 
    !contact[contactCustomField.CONTACT_CONFIDENCE.id] 
    && contact[contactCustomField.CONTACT_CONFIDENCE.id] !== 0
  );
  return processPromiseArray(unverifiedContacts.map(contact => () => verifyContact(contact, { dryRun })));
} 

async function verifyContacts({ query, debug, dryRun }) {
  const leads = await searchLeads({ query, fields: 'id,contacts' });
  return processPromiseArray(leads.map(lead => () => findContacts(lead, { debug, dryRun})));
}

module.exports = verifyContacts;
