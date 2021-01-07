const getEmailStatusFromGMass = require('../utils/getEmailStatusFromGMass');
const { getEmailDomain } = require('../utils/contactUtils');
const { conditionalAssignField, conditionalAssign } = require('../utils/utils');
const { contactCustomField } = require('../constants/close');

function directoryMatch(data, { DIRECTORY_ID , ...fields }) {
  let emailDomain = getEmailDomain(data['email']);
  return Object.assign({},
    conditionalAssignField(DIRECTORY_ID && data[fields['id']], DIRECTORY_ID),
    conditionalAssignField(data[fields['phone']], 'phone'),
    conditionalAssignField(data[fields['email']], 'email'),
    conditionalAssignField(data[fields['url']], 'url'),
    conditionalAssignField(data[fields['name']], 'name'),
    conditionalAssignField(emailDomain, 'emailDomain'),
    conditionalAssignField(data[fields['city']], 'city'),
    conditionalAssignField(data[fields['countryCode']], 'countryCode'),
  );
}

async function directoryContact({ _validateEmailWithGMass = true, emailDomain, isFreeEmailDomain, ...data }, { CONTACT_NAME, ...fields }) {
  const emailStatusFromGMass = _validateEmailWithGMass
    ? await getEmailStatusFromGMass(data[fields['email']])
    : {};
  return Object.assign(
    {
      'name': CONTACT_NAME,
      [contactCustomField.CONTACT_CONFIDENCE.id]: 40,
      [contactCustomField.CONTACT_DOMAIN.id]: emailDomain,
      [contactCustomField.CONTACT_FREE_DOMAIN.id]: isFreeEmailDomain ?
        contactCustomField.CONTACT_FREE_DOMAIN.options.YES :
        contactCustomField.CONTACT_FREE_DOMAIN.options.NO,
      [contactCustomField.CONTACT_TYPE.id]: contactCustomField.CONTACT_TYPE.options.GENERIC,
      [contactCustomField.CONTACT_VERIFIED.id]: contactCustomField.CONTACT_VERIFIED.options.NO,
      'emails': [
        {
          'type': 'office',
          'email': data[fields['email']]
        }
      ]
    },
    conditionalAssign(data[fields['phone']], {
      'phones': [
        {
          'type': 'office',
          'phone': data[fields['phone']]
        }
      ]
    }),
    emailStatusFromGMass
  );
}

module.exports = { directoryMatch, directoryContact };