const { orderBy, get } = require('lodash');

function byActivieties(c) {
  return get(c, 'activities.length', -1);
}

function byContacts(c) {
  return get(c, 'contacts.length', -1);
}

function byOpportunities(c) {
  return get(c, 'opportunities.length', -1);
}

function byUpdateData(c) {
  return new Date(get(c, 'date_updated'));
}


function getTargetLead(leads) {
  let [target] = orderBy(leads, [byActivieties, byOpportunities, byContacts, byUpdateData], ['desc', 'desc', 'desc', 'desc']);
  return target;
}

module.exports = getTargetLead;