const searchLeadsWithQueries = require('./searchLeadsWithQueries');
const createSerachQueries = require('./createSerachQueries');

async function matchLeadsWithSchema(schema, options = {}) {
  const queries = createSerachQueries(schema);
  if (!queries || !queries.length) 
    return {};
  return searchLeadsWithQueries(queries, options)
}

module.exports = matchLeadsWithSchema;