
const mergeContacts = require('./mergeContacts');
const updateLead = require('../close/updateLead');
const deleteContact = require('../close/deleteContact');
const processPromiseArray = require('../utils/processPromiseArray');

async function deleteDuplicateContacts(contacts) {
  if (!contacts || !contacts.length)
    return true;
  return await processPromiseArray(contacts.map(contact => () => deleteContact(contact)));
}

async function mergeLeadContacts({ id, contacts }) {
  try {
    const { merged, duplicates } = await mergeContacts(contacts);
    await updateLead({ id, contacts: merged });
    await deleteDuplicateContacts(duplicates);
    return merged;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

module.exports = mergeLeadContacts;