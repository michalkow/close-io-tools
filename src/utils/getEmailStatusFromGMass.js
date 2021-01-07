const httpsGet = require('./httpsGet');
const { contactCustomField } = require('../constants/close');

function getStatusConfidence(status) {
  switch (status) {
    case 'Valid':
      return 80;
    case 'Blocked':
      return 50;
    case 'Unknown':
      return 40;
    case 'Malformed':
      return 0;
    case 'NoMxRecord':
      return 0;
    case 'Invalid':
      return 0;
    case 'ConnectionFail':
      return 30;
    case 'OverQuota':
      return 20;      
    default:
      return 40;
  }
}

async function getEmailStatusFromGMass(email) {
  const { response, error } = await httpsGet(`https://verify.gmass.co/check?email=${email}`);
  if (error) 
    return {}
  return {
    [contactCustomField.CONTACT_CONFIDENCE.id]: getStatusConfidence(response['Status']),
    [contactCustomField.CONTACT_VERIFIED.id]: response['Valid']
      ? contactCustomField.CONTACT_VERIFIED.options.YES
      : contactCustomField.CONTACT_VERIFIED.options.NO,
  }
}

module.exports = getEmailStatusFromGMass;