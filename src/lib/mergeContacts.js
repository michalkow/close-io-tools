
const sortContacts = require('./sortContacts');
const { matchContact, mergeContactsData } = require('../utils/contactUtils');
const { remove } = require('lodash');

function recursiveMerge(contacts = [], merged = [], duplicates = [], resolve, reject) {
  if (!contacts.length)
    return resolve({ merged, duplicates })
  let first = contacts.shift();
  let removed = remove(contacts, contact => matchContact(contact, first));
  merged.push(mergeContactsData([first, ...removed]));
  return recursiveMerge(contacts, merged, [...duplicates, ...removed], resolve, reject)
}

function mergeContacts(contacts) {
  if (!contacts || !contacts.length) 
    return Promise.resolve({});
  const sortedContacts = sortContacts(contacts);
  return new Promise((resolve, reject) =>
    recursiveMerge(sortedContacts, [], [], resolve, reject)
  );
}

module.exports = mergeContacts;