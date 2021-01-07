// First Name, Middle Name, Last Name, LinkedIn, Title, Company, Education, Location, Address, Industry, Website, Twitter, Email, Phone, Connections, Tags, person_name, result_title, linkedin_url, email, verified_email_only, email_type, alternative_emails, amf_status
const { linkedinAnymailMatch, linkedinAnymailLead } = require('./linkedinAnymail');

const fields = {
  IMPORT_SOURCE: 'Import Weconnect/Anymail',
  linkedInUrl: 'LinkedIn',
  title: 'Title',
  phone: 'Phone',
  name: 'Company',
  contactNames: ['First Name', 'Middle Name', 'Last Name']
};

function weconnectAnymailMatch(data) {
  return linkedinAnymailMatch(data, fields);
}

function weconnectAnymailLead(data, lead) {
  return linkedinAnymailLead(data, lead, fields)
}

module.exports = { weconnectAnymailMatch, weconnectAnymailLead };