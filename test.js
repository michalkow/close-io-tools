const schemas = require('./src/schemas');
const matchLeadsWithSchema = require('./src/lib/matchLeadsWithSchema');

async function test(data) {
  try {
    console.time('time')
    const schemaMatch = schemas.TRIPADVISOR.makeMatch(data);
    const { leads, query } = await matchLeadsWithSchema(schemaMatch);
    console.log(query, leads.length);
    console.timeEnd('time');
    return true;
  } catch (error) {
    console.log(error);
  }
}

test({
  email: 'jack@max.se'
});