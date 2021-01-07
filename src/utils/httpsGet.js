const https = require('https');

function httpsGet(url) {
  return new Promise((resolve) =>
    https.get(url, res => {
      try {
        res.setEncoding('utf8');
        let response = '';
        res.on('data', data => {
          response += data;
        });
        res.on('end', () => {
          response = JSON.parse(response);
          resolve({ response });
        });
      } catch (error) {
        resolve({ error })
      }
    })
  );
}

module.exports = httpsGet;