const { orderBy, get } = require('lodash');
const { contactCustomField } = require('../constants/close');

function byVerification(c) {
  switch (c[contactCustomField.CONTACT_VERIFIED.id]) {
    case contactCustomField.CONTACT_VERIFIED.options.YES:
      return 2;
    case contactCustomField.CONTACT_VERIFIED.options.NO:
      return 1;
    default:
      return 0;
  }
}

function byType(c) {
  switch (c[contactCustomField.CONTACT_TYPE.id]) {
    case contactCustomField.CONTACT_TYPE.options.PERSONAL:
      return 2;
    case contactCustomField.CONTACT_TYPE.options.GENERIC:
      return 1;
    default:
      return 0;
  }
}

function byPriority(c) {
  return c[contactCustomField.CONTACT_PRIORITY.id];
}

function byConfidence(c) {
  return get(c, contactCustomField.CONTACT_CONFIDENCE.id, 50);
}

function sortContacts(contacts) {
  return orderBy(contacts, [byPriority, byVerification, byConfidence, byType], ['desc', 'desc', 'desc', 'desc']);
}

module.exports = sortContacts;