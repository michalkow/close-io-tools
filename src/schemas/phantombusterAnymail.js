// profileUrl, firstName, lastName, fullName, headline, location, summary, userId, companyName, connectionsCount, followersCount, connectionDegree, jobTitle, companyUrl, linkedinUrl, companyId, website, industry, companySize, headquarters, type, industryCode, timestamp, founded, specialties, companyPhone, mail, websites, mailFromHunter, person_name, result_title, linkedin_url, email, verified_email_only, email_type, alternative_emails, amf_status
const { linkedinAnymailMatch, linkedinAnymailLead } = require('./linkedinAnymail');

const fields = {
  IMPORT_SOURCE: 'Import Phantombuster/Anymail',
  linkedInUrl: 'linkedinUrl',
  title: 'jobTitle',
  phone: 'companyPhone',
  name: 'companyName',
  contactNames: ['firstName', 'lastName']
};

function phantombusterAnymailMatch(data) {
  return linkedinAnymailMatch(data, fields);
}

function phantombusterAnymailLead(data, lead) {
  return linkedinAnymailLead(data, lead, fields)
}

module.exports = { phantombusterAnymailMatch, phantombusterAnymailLead };