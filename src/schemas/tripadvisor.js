const freeEmailDomains = require('free-email-domains');
const { upsertContact } = require('../lib/upsertContacts');
const { findContact, getEmailDomain } = require('../utils/contactUtils');
const { leadStatus, leadCustomField } = require('../constants/close');
const { conditionalAssignField, conditionalAssign } = require('../utils/utils');
const { directoryMatch, directoryContact } = require('./directory');

const IMPORT_SOURCE = 'TripAdvisor Scraper';
const CONTACT_NAME = 'TripAdvisor';
const DIRECTORY_ID = 'tripAdvisorId';
const fields = {
  DIRECTORY_ID,
  CONTACT_NAME,
  id: 'id',
  phone: 'phone',
  email: 'email',
  url: 'website',
  name: 'name',
  city: 'city',
  countryCode: 'countryCode',
}

function tripadvisorMatch(data) {
  return directoryMatch(data, fields);
}

function tripadvisorContact(data) {
  return directoryContact(data, fields)
}

async function tripadvisorLead({ countryCode, city, state, ...data }, lead) {
  let emailDomain = getEmailDomain(data['email']);
  let isFreeEmailDomain = freeEmailDomains.includes(emailDomain);
  let contact = await tripadvisorContact({ emailDomain, isFreeEmailDomain, ...data });
  let contacts = findContact(lead, contact) ? upsertContact(lead, contact) : [contact];
  let tripAdvisorType = data['type'].toLowerCase();
  let tripAdvisorAwards = data['awards'].length ? data['awards'].map(({ name }) => name).join(', ') : null;
  let leadTripAdvisorIDs = (lead && lead[leadCustomField.TRIP_ADVISOR_IDS.id]) || [];
  let hasTripAdvisorID = lead && (data['id'] === lead[leadCustomField.TRIP_ADVISOR_ID.id] || leadTripAdvisorIDs.indexOf(data['id']) > -1);
  let tripAdvisorIDs = !hasTripAdvisorID && [...leadTripAdvisorIDs, data['id']];
  let leadTripAdvisorNumberOfVenues = (lead && lead[leadCustomField.TRIP_ADVISOR_NUMBER_OF_VENUES.id]) || 0;
  let tripAdvisorNumberOfVenues = !hasTripAdvisorID && leadTripAdvisorNumberOfVenues + 1;
  return Object.assign({},
    conditionalAssignField(contacts, 'contacts'),
    conditionalAssignField(!lead && leadStatus.POTENTIAL.id, 'status_id'),
    conditionalAssignField(!lead && tripAdvisorType, 'type'),
    conditionalAssignField(!lead && IMPORT_SOURCE, leadCustomField.IMPORT_SOURCE.id),
    conditionalAssignField(!lead && data['importContext'], leadCustomField.IMPORT_CONTEXT.id),
    conditionalAssignField(!lead && data['name'], 'name'),
    conditionalAssignField(!lead && data['url'], 'url'),
    conditionalAssignField(!lead && data['rankingString'], 'description'),
    conditionalAssign((!lead || !lead.addresses) && data['address'] && countryCode && city, {
      'addresses': [
        {
          'label': 'business',
          'address_1': data.address,
          'city': city,
          'state': state || '',
          'country': countryCode
        }
      ]
    }),
    conditionalAssignField(!lead && !isFreeEmailDomain && emailDomain, leadCustomField.DOMAIN.id),
    conditionalAssignField(tripAdvisorNumberOfVenues, leadCustomField.TRIP_ADVISOR_NUMBER_OF_VENUES.id),
    conditionalAssignField(tripAdvisorIDs, leadCustomField.TRIP_ADVISOR_IDS.id),
    conditionalAssignField(!lead && tripAdvisorAwards, leadCustomField.TRIP_ADVISOR_AWARDS.id),
    conditionalAssignField(!lead && data['id'], leadCustomField.TRIP_ADVISOR_ID.id),
    conditionalAssignField(!lead && data['numberOfReviews'], leadCustomField.TRIP_ADVISOR_NUMBER_OF_REVIEWS.id),
    conditionalAssignField(!lead && data['priceLevel'], leadCustomField.TRIP_ADVISOR_PRICE_LEVEL.id),
    conditionalAssignField(!lead && data['rankingPosition'], leadCustomField.TRIP_ADVISOR_RANKING_POSITION.id),
    conditionalAssignField(!lead && data['rating'], leadCustomField.TRIP_ADVISOR_RATING.id),
    conditionalAssignField(!lead && data['webUrl'], leadCustomField.TRIP_ADVISOR_URL.id),
    conditionalAssignField(!lead && data['category'], leadCustomField.TRIP_ADVISOR_CATEGORY.id),
  );
}

module.exports = { tripadvisorMatch, tripadvisorLead };