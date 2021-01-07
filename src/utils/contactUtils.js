const { compact, find, uniqBy, flatten, defaults } = require('lodash');
const { hasInArray } = require('./utils');

function combineName(array, join = ' ') {
  return compact(array).length ? compact(array).join(join) : null;
}

function getLinkedInProfileFromURL(url = '') {
  let parts = url.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2] || null;
} 

function getEmailDomain(email) {
  return email ? email.split('@')[1] : null;
} 

function mergeContactsData(contacts) {
  return Object.assign({},
    defaults(...contacts),
    {
      emails: compact(uniqBy(flatten(contacts.map(({ emails }) => emails)), 'email')),
      phones: compact(uniqBy(flatten(contacts.map(({ phones }) => phones)), 'phone'))
    }
  );
}

function matchContact(leadContact, contact) {
  return hasInArray(leadContact.emails, contact.emails, 'email') ||
    hasInArray(leadContact.phones, contact.phones, 'phone') ||
    leadContact.name === contact.name;
}

function findContact(lead, contact) {
  if (!lead || !lead.contacts || !lead.contacts.length)
    return null;
  return find(lead.contacts, leadContact => matchContact(leadContact, contact));
}

module.exports = {
  combineName,
  getLinkedInProfileFromURL,
  getEmailDomain,
  mergeContactsData,
  findContact,
  matchContact
}
