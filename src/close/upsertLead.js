const createLead = require('./createLead');
const updateLead = require('./updateLead');

function upsertLead({ id, ...data }, options = {}) {
  return id  
    ? updateLead({ id, ...data }, options) 
    : createLead(data, options);
}

module.exports = upsertLead;