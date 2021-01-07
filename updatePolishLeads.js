const batchSearch = require('./src/batchSearch');
const updatePolishLead = require('./src/utils/updatePolishLead');

function updateLeadsByQuery(query) {
  return new Promise((resolve, reject) => {
    batchSearch({ query, fields: 'id,name,addresses,contacts' }, 0, 200, updatePolishLead, resolve, reject)
  })
}
console.time('time');

updateLeadsByQuery('address(city:"Warsaw") contact(not name:(TripAdvisor))').then(leadCount => {
  console.log('leadCount:' + JSON.stringify(leadCount));
  console.timeEnd('time');
}).catch((err) => console.error(err));