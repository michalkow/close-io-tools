const readCsvFile = require('./utils/readCsvFile');
const processPromiseArray = require('./utils/processPromiseArray');
const schemas = require('./schemas');
const importLeadWithSchema = require('./importLeadWithSchema');

async function importLeadsFromFile(schemaName, file, { extraFields, ...options } = {}) {
  if (!schemas[schemaName] || !file) 
    return console.error('NO SCHEMA OR FILE');
  const rows = await readCsvFile(file);
  Object.assign(extraFields, { importContext: file.split('/').pop() })
  return processPromiseArray(rows.map(row => () => importLeadWithSchema(schemaName, row, { extraFields, ...options })));
}

module.exports = importLeadsFromFile;