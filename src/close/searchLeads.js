const closeio = require('./closeio');
const retry = require('./retry');

function recursiveLeadSearch({ limit = 200, skip = 0, ...options }, { retried = false} = {}, results = [], resolve, reject) {
  closeio.lead.search({ limit, skip, ...options }).then(
    ({ data: leads, has_more }) => 
      has_more && limit !== 1
        ? recursiveLeadSearch({ limit, skip: skip + limit, ...options }, { retried: true }, [...results, ...leads], resolve, reject) 
        : resolve([...results, ...leads]),
    (error) => retried 
      ? reject(error) 
      : retry(error, () => recursiveLeadSearch({ limit, skip, ...options }, { retried: true }, results, resolve, reject))
  )
}

function searchLeads({ limit = 200, skip = 0, ...options }) {
  return new Promise((resolve, reject) =>
    recursiveLeadSearch({ limit, skip, ...options }, {}, [], resolve, reject)
  );
}

module.exports = searchLeads;