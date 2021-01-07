const { weconnectAnymailMatch, weconnectAnymailLead } = require('./weconnectAnymail');
const { phantombusterAnymailMatch, phantombusterAnymailLead } = require('./phantombusterAnymail');
const { tripadvisorMatch, tripadvisorLead } = require('./tripadvisor');
const { closeMatch } = require('./close');

const schemas = {
  WECONNECT_ANYMAIL: {
    keyField: 'Company',
    makeMatch: weconnectAnymailMatch,
    makeLead: weconnectAnymailLead
  },
  PHANTOMBUSTER_ANYMAIL: {
    keyField: 'companyName',
    makeMatch: phantombusterAnymailMatch,
    makeLead: phantombusterAnymailLead
  },
  TRIPADVISOR: {
    keyField: 'name',
    makeMatch: tripadvisorMatch,
    makeLead: tripadvisorLead
  },
  CLOSE: {
    keyField: 'name',
    makeMatch: closeMatch
  }
};

module.exports = schemas;