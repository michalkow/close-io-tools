const sortLeadContacts = require('./sortLeadContacts');
const upsertLead = require('../close/upsertLead');
const { conditionalAssignField } = require('../utils/utils');


async function upsertLeadWithSchema(schema, lead, { dryRun = false } = {}) {  
  let { _sortAfterUpdate, ...data } = schema;
  let sortedLead;
  let upsertData = Object.assign({}, data, conditionalAssignField(lead && lead.id, 'id'))
  let { lead: upsertedLead, updated } = await upsertLead(upsertData, { dryRun });
  if (_sortAfterUpdate)
    sortedLead = await sortLeadContacts(upsertedLead, { dryRun });
  return { lead: sortedLead || upsertedLead, updated }
}

module.exports = upsertLeadWithSchema;