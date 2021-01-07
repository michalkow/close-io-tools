const importFile = require('./importFile');
const createReport = require('./createReport');
const deduplicate = require('./deduplicate');
const verifyContacts = require('./verifyContacts');
const config = require(`../${process.env.CONFIG_JS_PATH}`);

const [, , scriptName] = process.argv;

const { debug, dryRun, scripts } = config;

const script = {
  import: {
    info: ({ schemaName, file }) => 
      `Importing leads of schema "${schemaName}" from file: "${file}"`,
    action: importFile,
  },
  report: {
    info: ({ dateRange, userNames }) =>
      `Generating report from ${dateRange[0]} to ${dateRange[1]} for users: ${userNames.join(', ')}`,
    action: createReport,
  },
  deduplicate: {
    info: ({ query }) =>
      `Looking for duplicates in query: ${query}`,
    action: deduplicate,
  },
  verify: {
    info: ({ query }) =>
      `Verifying contacts in query: ${query}`,
    action: verifyContacts,
  }
}

async function main() {
  try {
    console.time('Script Execution Time');
    const options = Object.assign({}, { debug, dryRun }, scripts[scriptName]);
    console.log(script[scriptName].info(options));
    const results = await script[scriptName].action(options);
    if (results && results.length)
      console.log(`Script preformed ${results.length} operations`);
    if(debug)
      console.log(results.map((result => result.debug)));
    console.timeEnd('Script Execution Time')
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

main();