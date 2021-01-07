const searchLeads = require('./src/close/searchLeads');
const updateContact = require('./src/close/updateContact');
const processPromiseArray = require('./src/utils/processPromiseArray');
const getEmailStatusFromGMass = require('./src/utils/getEmailStatusFromGMass');
const { startsWith, find } = require('lodash');

async function rename(lead) {
  if (!lead.contacts || !lead.contacts.length)
    return true;

  const tripAdvisorContact = find(lead.contacts, contact => startsWith(contact.name, 'TripAdvisor'));
  if (!tripAdvisorContact)
    return true;
  const emailStatus = await getEmailStatusFromGMass(tripAdvisorContact.emails[0].email)
  const updateData = Object.assign({}, { id: tripAdvisorContact.id }, emailStatus)
  console.count();
  return updateContact(updateData);
} 

async function test(query) {
  try {
    console.time('time')
    console.log('Search for query: ' + query)
    const leads = await searchLeads({ query, fields: 'id,contacts' });
    await processPromiseArray(leads.map(lead => () => rename(lead)));
    console.timeEnd('time');
    return true;
  } catch (error) {
    console.log(error);
  }
}

test(`contact("custom.contact confidence": "") "custom.import source":"TripAdvisor Scraper"`);
