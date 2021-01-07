const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function updateLead({ id, ...data }, { dryRun } = {}) {
  if (dryRun)
    return { lead: data };

  const lead = await closeAction(() => closeio.lead.update(id, data));
  return { lead, updated: true };
}

module.exports = updateLead;