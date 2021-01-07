const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function countLeads(options = { limit: 1, fields: 'id' }) {
  const { total_results } = await closeAction(() => closeio.lead.search(options));
  return total_results;
}

module.exports = countLeads;