const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function deleteContact({ id }, { dryRun } = {}) {
  if (dryRun)
    return { result: true, debug: true };

  await closeAction(() => closeio.contact.delete(id));
  return { result: true };
}

module.exports = deleteContact;