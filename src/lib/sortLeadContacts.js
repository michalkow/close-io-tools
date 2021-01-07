const sortContacts = require('./sortContacts');
const updateLead = require('../close/updateLead');

function sortLeadContacts({ id, contacts }, options = {}) {
  return updateLead({ id, contacts: sortContacts(contacts) }, options);
}

module.exports = sortLeadContacts;