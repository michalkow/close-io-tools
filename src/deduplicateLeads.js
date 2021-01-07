const searchLeads = require('./close/searchLeads');
const readLead = require('./close/readLead');
const searchActivities = require('./close/searchActivities');
const mergeLeads = require('./close/mergeLeads');
const getTargetLead = require('./lib/getTargetLead');
const mergeLeadContacts = require('./lib/mergeLeadContacts');
const processPromiseArray = require('./utils/processPromiseArray');

async function getLeadsWithActivities(leads) {
  const activities = await processPromiseArray(leads.map(({ id }) => () => searchActivities({ lead_id: id, fields: '_type' })));
  return leads.map((lead, i) => Object.assign({}, lead, { activities: activities[i] }));
}

async function deduplicateLeads(query) {
  const leads = await searchLeads({ query, fields: `id,name,contacts,opportunities,date_updated,custom` })
  const activityLeads = await getLeadsWithActivities(leads);
  const targetLead = getTargetLead(activityLeads);
  await mergeLeads(activityLeads, targetLead);
  const lead = await readLead(targetLead)
  await mergeLeadContacts(lead)
  return lead;
}

module.exports = deduplicateLeads;