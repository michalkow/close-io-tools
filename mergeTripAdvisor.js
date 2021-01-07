const searchLeads = require('./src/close/searchLeads');
const processPromiseArray = require('./src/utils/processPromiseArray');
const mergeLeadContacts = require('./src/lib/mergeLeadContacts');

async function merge(lead) {
  await mergeLeadContacts(lead);
  console.count();
  return true;
} 

async function test(query) {
  try {
    console.time('time')
    console.log('Search for query: ' + query)
    const leads = await searchLeads({ query, fields: 'id,contacts' });
    await processPromiseArray(leads.map(lead => () => merge(lead)));
    console.timeEnd('time');
    return true;
  } catch (error) {
    console.log(error);
  }
}

test(`contact(name:(TripAdvisor)) contacts > 1`);
