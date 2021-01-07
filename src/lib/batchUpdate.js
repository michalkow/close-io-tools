const searchLeads = require('../close/searchLeads');
const updateLead = require('../close/updateLead');
const processPromiseArray = require('../utils/processPromiseArray');

async function batchUpdate(options = {}, updater) {
  const leads = await searchLeads(options);
  const updatedLeads = await processPromiseArray(leads.map(lead => () => updater(lead)));
  return processPromiseArray(updatedLeads.map(updatedLead => () => updateLead(updatedLead)));
}

module.exports = batchUpdate;