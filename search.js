const getEmailStatusFromGMass = require('./src/utils/getEmailStatusFromGMass');
const processPromiseArray = require('./src/utils/processPromiseArray');
const { isEmpty, times } = require('lodash');

async function test(email) {
  const info = await getEmailStatusFromGMass(email);
  console.log(info);
  if (isEmpty(info))
    throw 'error';
  return info;
}

async function main() {
  try {
    console.time('time')
    let emails = times(100, () => 'michal@stktk.com')
    let results = await processPromiseArray(emails.map(email => () => test(email)));
    console.log(results);
    console.timeEnd('time');
    return true;
  } catch (error) {
    console.log(error);
  }
}

main();