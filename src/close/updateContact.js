const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function updateContact({ id, ...data }, { dryRun } = {}) {
  if (dryRun)
    return { contact: data };

  const contact = await closeAction(() => closeio.contact.update(id, data));
  return { contact, updated: true };
}

module.exports = updateContact;