const sortContacts = require('./sortContacts');
const { mergeContactsData, matchContact, findContact } = require('../utils/contactUtils');
const { upsertItems } = require('../utils/utils');

function upsertContacts(lead, contacts) {
  if (!lead || !contacts || !contacts.length)
    return null;
  return sortContacts(upsertItems(lead.contacts, contacts, matchContact, (a, b) => mergeContactsData([a,b])));
}

function upsertContact(lead, contact) {
  if (!lead || !contact)
    return null;
  if (!lead || !lead.contacts || !lead.contacts.length || !findContact(lead, contact))
    return [contact];
  return sortContacts(
    lead.contacts.map(leadContact => 
      matchContact(leadContact, contact) 
        ? mergeContactsData([leadContact, contact]) 
        : leadContact
    )
  );
}

module.exports = { upsertContacts, upsertContact };