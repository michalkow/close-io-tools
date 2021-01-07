const importLeadsFromFile = require('../src/importLeadsFromFile');

function importFile({ schemaName, file, debug, dryRun, extraFields }) {
  return importLeadsFromFile(schemaName, file, { debug, dryRun, extraFields });
}

module.exports = importFile;