const deduplicateLeads = require('../src/deduplicateLeads');
const schemas = require('../src/schemas');
const matchLeadsWithSchema = require('../src/lib/matchLeadsWithSchema');
const searchLeads = require('../src/close/searchLeads');
const processPromiseArray = require('../src/utils/processPromiseArray');
const writeCsvFileFromJson = require('../src/utils/writeCsvFileFromJson');

const time = new Date().toISOString();
const outputPath = `output/deduplicationReport-${time}.csv`;
const report = [];

async function findDuplicates(lead, { dryRun, debug }) {
  const schemaMatch = schemas.CLOSE.makeMatch(lead);
  const { leads, query } = await matchLeadsWithSchema(schemaMatch);
  if (!leads || !leads.length)
    return {};
  const margedLead = dryRun ? leads[0] : await deduplicateLeads(query);
  if (debug) {
    console.count();
    console.log(`${leads.length} leads merged into ${margedLead.name} for query: ${query}`);
  }
  report.push({ lead: margedLead.name, count: leads.length, query, url: `https://app.close.com/lead/${margedLead.id}` });
  return margedLead;
}

async function deduplicate({ query, dryRun, debug }) {
  try {
    const leads = await searchLeads({ query })
    await processPromiseArray(leads.map(lead => () => findDuplicates(lead, { dryRun, debug })));
    writeCsvFileFromJson(outputPath, report); 
    return {};
  } catch (error) {
    writeCsvFileFromJson(outputPath, report); 
    throw error;
  }
}

module.exports = deduplicate;