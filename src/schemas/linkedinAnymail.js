const freeEmailDomains = require('free-email-domains');
const { upsertContacts } = require('../lib/upsertContacts');
const { contactCustomField, leadCustomField } = require('../constants/close');
const { conditionalAssignField, conditionalAssign } = require('../utils/utils');
const { combineName, getLinkedInProfileFromURL, getEmailDomain, findContact } = require('../utils/contactUtils');

function linkedinAnymailMatch(data, { linkedInUrl }) {
  let linkedInProfile = getLinkedInProfileFromURL(data[linkedInUrl]);
  let emailDomain = getEmailDomain(data['email']);
  return Object.assign({},
    conditionalAssignField(linkedInProfile, 'linkedInProfile'),
    conditionalAssignField(data['email'], 'email'),
    conditionalAssignField(emailDomain, 'emailDomain')
  );
}

async function anymailContact({ emailDomain, isFreeEmailDomain, ...data }, { linkedInUrl, title, phone, contactNames }) {
  let linkedInProfile = getLinkedInProfileFromURL(data[linkedInUrl]);
  let name = combineName(contactNames.map(key => data[key]));
  return Object.assign({},
    conditionalAssignField(name, 'name'),
    conditionalAssignField(data[title], 'title'),
    conditionalAssignField(linkedInProfile, [contactCustomField.LINKEDIN_PROFILE.id]),
    conditionalAssign(data['email'], {
      [contactCustomField.CONTACT_CONFIDENCE.id]:
        data['email_type'] === 'verified' ? 90 : 65,
      [contactCustomField.CONTACT_DOMAIN.id]: emailDomain,
      [contactCustomField.CONTACT_FREE_DOMAIN.id]: isFreeEmailDomain
        ? contactCustomField.CONTACT_FREE_DOMAIN.options.YES
        : contactCustomField.CONTACT_FREE_DOMAIN.options.NO,
      [contactCustomField.CONTACT_TYPE.id]:
        contactCustomField.CONTACT_TYPE.options.PERSONAL,
      [contactCustomField.CONTACT_VERIFIED.id]: data['email_type'] === 'verified'
        ? contactCustomField.CONTACT_VERIFIED.options.YES
        : contactCustomField.CONTACT_VERIFIED.options.NO,
      emails: [{
        type: 'direct',
        email: data['email']
      }]
    }),
    conditionalAssign(data[phone], {
      phones: [{
        type: 'direct',
        phone: data[phone]
      }]
    })
  );
}

async function linkedinAnymailLead(data, lead, { IMPORT_SOURCE, ...fields}) {
  if (!data['email'])
    return null;
  let emailDomain = getEmailDomain(data['email']);
  let isFreeEmailDomain = freeEmailDomains.includes(emailDomain);
  let contact = await anymailContact({ emailDomain, isFreeEmailDomain, ...data }, fields)
  if (lead) {
    let contatExists = findContact(lead, contact);
    let contacts = contatExists ? upsertContacts(lead, [contact]) : [contact];
    return Object.assign({},
      conditionalAssignField(contacts, 'contacts'),
      conditionalAssignField(!contatExists, '_sortAfterUpdate')
    );
  }
  return Object.assign({},
    conditionalAssignField(data[fields.name], 'name'),
    conditionalAssignField(IMPORT_SOURCE, leadCustomField.IMPORT_SOURCE.id),
    conditionalAssignField(data['importContext'], leadCustomField.IMPORT_CONTEXT.id),
    conditionalAssignField(!isFreeEmailDomain && emailDomain, 'domain'),
    conditionalAssignField([contact], 'contacts'),
    conditionalAssign(data['countryCode'] && data['city'], {
      'addresses': [
        {
          'label': 'business',
          'city': data['city'],
          'country': data['countryCode']
        }
      ]
    }),
  );
}

module.exports = { linkedinAnymailMatch, linkedinAnymailLead };