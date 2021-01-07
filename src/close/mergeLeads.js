const closeio = require('./closeio');
const closeAction = require('./closeAction');
const updateLead = require('./updateLead');
const processPromiseArray = require('../utils/processPromiseArray');
const { leadCustomField } = require('../constants/close');

async function mergeLead(source, target, { dryRun } = {}) {
  if (source === target || dryRun)
    return true;
  const lead = await closeAction(() => closeio.lead.merge({ source, destination: target }));
  return lead;
}

async function mergeLeads(leads, target, options = {}) {
  const result = await processPromiseArray(
    leads.map(({ id }) => () => mergeLead(id, target.id, options))
  );
  const numberOfMergedLeads = (target[leadCustomField.NUMBER_OF_MERGED_LEADS.id] || 0) + leads.length;
  await updateLead({ id: target.id, [leadCustomField.NUMBER_OF_MERGED_LEADS.id]: numberOfMergedLeads })
  return result;
}

module.exports = mergeLeads;