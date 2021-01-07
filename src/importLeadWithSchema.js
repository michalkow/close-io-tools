const schemas = require('./schemas');
const matchLeadsWithSchema = require('./lib/matchLeadsWithSchema');
const upsertLeadWithSchema = require('./lib/upsertLeadWithSchema');
const debugDryRun = require('./utils/debugDryRun');

async function importLeadWithSchema(schemaName, data, { debug = false, limit = 1, extraFields = {}, dryRun = false, ...options } = {}) {
  let debugText;
  Object.assign(data, extraFields);
  if (!schemas[schemaName]) 
    throw 'NO SCHEMA TYPE';
  const schemaMatch = schemas[schemaName].makeMatch(data);
  const { leads, query } = await matchLeadsWithSchema(schemaMatch, { debug, limit, ...options });
  const matchedLead = leads ? leads[0] : null;
  const schemaKey = data[schemas[schemaName].keyField];
  if (debug)
    debugText = debugDryRun(schemaKey, matchedLead, query);
  if(dryRun)
    return { lead: matchedLead, debug: debugText }
  const schemaLead = await schemas[schemaName].makeLead(data, matchedLead);
  if (!schemaLead)
    return {};
  const { lead: upsertedLead } = await upsertLeadWithSchema(schemaLead, matchedLead, { debug, limit, dryRun, ...options });
  return { lead: upsertedLead, debug: debugText }
}

module.exports = importLeadWithSchema;