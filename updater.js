const batchUpdate = require('./src/lib/batchUpdate');

async function updater(lead) {
  return Object.assign({}, { id: lead.id }, {
    'addresses': [
      {
        'label': 'business',
        'city': 'Manchester',
        'country': 'GB'
      }
    ]
  });
}


async function updateLeads(options) {
  try {
    console.time('time');
    const results = await batchUpdate(options, updater);
    console.log(results.map((result => result)));
    console.timeEnd('time')
  } catch (error) {
    console.error(error);
  }
}

const conditions = {
  query: `address(location:"Manchaster")`,
  fields: 'id,name'
}


updateLeads(conditions);