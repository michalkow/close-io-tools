const searchLeads = require('../close/searchLeads');

function recursiveQuerySearch(queries, options, index = 0, resolve, reject) {
  if (!queries[index])
    return resolve({}) 
  searchLeads({ query: queries[index], ...options })
    .then((leads) => 
      leads && leads.length
        ? resolve({ leads, query: queries[index] }) 
        : recursiveQuerySearch(queries, options, index + 1, resolve, reject)
    )
    .catch(reject)
}

function searchLeadsWithQueries(queries, options = {}) {
  return new Promise((resolve, reject) =>
    recursiveQuerySearch(queries, options, 0, resolve, reject)
  )
}

module.exports = searchLeadsWithQueries;