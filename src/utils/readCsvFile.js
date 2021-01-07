const csvtojson = require('csvtojson');

function readCsvFile(file) {
  return new Promise((resolve, reject) =>
    csvtojson()
      .fromFile(file)
      .then((rows) => {
        if (rows.length)
          return resolve(rows);
        return reject('ZERO LENGHT CSV');
      }).catch(reject)
  );
}

module.exports = readCsvFile;