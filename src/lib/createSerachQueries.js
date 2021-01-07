const countrynames = require('countrynames');
const freeEmailDomains = require('free-email-domains');
const { compact } = require('lodash');

const exactIn = array => 
  array.map(item => `"${item}"`).join(', ');

const createExactLeadQuery = ({ url, tripAdvisorId, googleMapsId, yeplId}) => {
  if (!url && !(tripAdvisorId || googleMapsId || yeplId))
    return null;
  let query = [];
  if  (url) {
    query.push(`"lead_url":"${url}"`); 
    query.push(`"custom.tripadvisor url":"${url}"`); 
    query.push(`"custom.google maps url":"${url}"`); 
  }
  if (tripAdvisorId)
    query.push(`"custom.tripadvisor id":"${tripAdvisorId}"`); 
  if (googleMapsId)
    query.push(`"custom.google maps id":"${googleMapsId}"`); 
  if (yeplId)
    query.push(`"custom.yelp id":"${yeplId}"`); 
  return query.join(' or ');
}

const createExactContactQuery = ({ email, linkedInProfile, phone }) => {
  if (!email && !linkedInProfile && !phone)
    return null;
  let query = [];
  if (email) 
    query.push(
      Array.isArray(email) 
        ? `contact(email(email in (${exactIn(email)})))`
        : `contact(email(email:"${email}"))`
    );
  if (phone)
    query.push(
      Array.isArray(phone)
        ? `contact(phone(phone in (${exactIn(phone)})))`
        : `contact(phone(phone:"${phone}"))`
    );
  if (linkedInProfile)
    query.push(
      Array.isArray(linkedInProfile)
        ? `contact("custom.linkedin profile" in (${exactIn(linkedInProfile)}))`
        : `contact("custom.linkedin profile":"${linkedInProfile}")`
    );
  return query.join(' or ');
}

const createLeadDomainQuery = ({ domain }) =>
  domain ? 
    `"custom.domain":"${domain}"` : 
    null;

const createLeadEmailDomainQuery = ({ emailDomain }) =>
  emailDomain && !freeEmailDomains.includes(emailDomain) ? 
    `"custom.domain":"${emailDomain}"` : 
    null;

const createLeadNameLocationQuery = ({ name, city, countryCode, country }) => 
  name && city && (countryCode || country) ?
    `"company":"${name}" address(city:"${city}" country:"${(countryCode || countrynames.getCode(country))}")` :
    null;

function createSerachQueries(data) {
  let queries = [
    createExactLeadQuery(data),
    createExactContactQuery(data),
    createLeadDomainQuery(data),
    createLeadEmailDomainQuery(data),
    createLeadNameLocationQuery(data)
  ];
  return compact(queries);
}

module.exports = createSerachQueries;