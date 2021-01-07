const fs = require('fs');
const { Parser } = require('json2csv');

function writeCsvFileFromJson(filePath, json) {
  const parser = new Parser();
  const csv = parser.parse(json);
  return fs.writeFileSync(filePath, csv);
}

module.exports = writeCsvFileFromJson;