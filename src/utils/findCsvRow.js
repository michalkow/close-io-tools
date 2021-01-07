const csvtojson = require('csvtojson');
const { find } = require('lodash');

async function findCsvRow(file, query) {
  const rows = await csvtojson().fromFile(file);
  return find(rows, query);
}

module.exports = findCsvRow;