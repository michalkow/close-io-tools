const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function createLead(data, { dryRun } = {}) {
  if (dryRun) 
    return { lead: data };

  const lead = await closeAction(() => closeio.lead.create(data));
  return { lead };
}

module.exports = createLead;