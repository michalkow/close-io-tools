const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function readLead({ id }) {
  const lead = await closeAction(() => closeio.lead.read(id));
  return lead;
}

module.exports = readLead;