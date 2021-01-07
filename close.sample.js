const leadStatus = {
  POTENTIAL: {
    name: 'Potantial',
    id: 'stat_somekey'
  }
}

const leadCustomField = {
  ALTERNATIVE_CITY: {
    name: 'Alternative City',
    id: 'custom.lcf_somekey'
  },
  ALTERNATIVE_NAME: {
    name: 'Alternative Name',
    id: 'custom.lcf_somekey'
  },
  DOMAIN: {
    name: 'Domain',
    id: 'custom.lcf_somekey'
  },
  LEAD_TYPE: {
    name: 'Lead Type',
    id: 'custom.lcf_somekey'
  },
  NUMBER_OF_MERGED_LEADS: {
    name: 'Number of Merged Leads',
    id: 'custom.lcf_somekey'
  },
  IMPORT_CONTEXT: {
    name: 'Import Context',
    id: 'custom.lcf_somekey'
  },
  IMPORT_SOURCE: {
    name: 'Import Source',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_ID: {
    name: 'TripAdvisor ID',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_IDS: {
    name: 'TripAdvisor IDs',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_NUMBER_OF_REVIEWS: {
    name: 'TripAdvisor Number of Reviews',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_PRICE_LEVEL: {
    name: 'TripAdvisor Price Level',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_RANKING_POSITION: {
    name: 'TripAdvisor Ranking Position',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_RATING: {
    name: 'TripAdvisor Rating',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_URL: {
    name: 'TripAdvisor URL',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_CATEGORY: {
    name: 'TripAdvisor Category',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_AWARDS: {
    name: 'TripAdvisor Awards',
    id: 'custom.lcf_somekey'
  },
  TRIP_ADVISOR_NUMBER_OF_VENUES: {
    name: 'TripAdvisor Number of Venues',
    id: 'custom.lcf_somekey'
  }
}

const contactCustomField = {
  ALTERNATIVE_NAME: {
    name: 'Alternative Name',
    id: 'custom.ccf_somekey'
  },
  CONTACT_GENDER: {
    name: 'Contact Gender',
    id: 'custom.ccf_somekey',
    options: {
      MALE: 'male',
      FEMALE: 'female',
      OTHER: 'other'
    }
  },
  CONTACT_SALUTATION: {
    name: 'Contact Salutation',
    id: 'custom.ccf_somekey'
  },
  CONTACT_PRIORITY: {
    name: 'Contact Priority',
    id: 'custom.ccf_somekey'
  },
  CONTACT_CONFIDENCE: {
    name: 'Contact Confidence',
    id: 'custom.ccf_somekey'
  },
  CONTACT_DOMAIN: {
    name: 'Contact Domain',
    id: 'custom.ccf_somekey'
  },
  CONTACT_FREE_DOMAIN: {
    name: 'Contact Free Domain',
    id: 'custom.ccf_somekey',
    options: {
      YES: 'Yes',
      NO: 'No'
    }
  },
  CONTACT_TYPE: {
    name: 'Contact Type',
    id: 'custom.ccf_somekey',
    options: {
      GENERIC: 'Generic',
      PERSONAL: 'Personal'
    }
  },
  CONTACT_VERIFIED: {
    name: 'Contact Verified',
    id: 'custom.ccf_somekey',
    options: {
      YES: 'Yes',
      NO: 'No'
    }
  },
  LINKEDIN_PROFILE: {
    name: 'LinkedIn Profile',
    id: 'custom.ccf_somekey'
  }
};

const user = {
  MICHAL: { id: 'user_somekey', name: 'Michal Kowalkowski' },
  JACK: { id: 'user_somekey', name: 'Jack Smith' },
  JOHN: { id: 'user_somekey', name: 'John James' },
}

module.exports = {
  leadStatus,
  leadCustomField,
  contactCustomField,
  user
};