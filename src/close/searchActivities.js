const closeio = require('./closeio');
const closeAction = require('./closeAction');

async function searchActivities(options = {}) {
  const { data } = await closeAction(() => closeio.activity.search(options));
  return data;
}

module.exports = searchActivities;