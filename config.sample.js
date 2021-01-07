module.exports = {
  debug: true,
  dryRun: false,
  scripts: {
    import: {
      file: 'input/leads.csv',
      schemaName: 'MYSCHEME',
      extraFields: { 
        city: 'Roskilde', 
        countryCode: 'DK' 
      }
    },
    report: {
      dateRange: ['2020-07-01', '2020-09-30'],
      userNames: ['JACK', 'MIKE', 'JANE']
    },
    deduplicate: {
      query: `lead_status in ("Potential")`
    },
    verify: {
      query: `lead_status in ("Potential")`
    }
  }
};