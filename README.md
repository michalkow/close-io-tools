# Close.io Tools

This repository contains a set of scripts using Close API to create/update entries in your Close.io CRM.
Functionalities include:

- Importing data from CSV files using custom schemas
- Bulk entry deduplication using criteria from schemas
- Bulk contacts email verification
- Generating custom reports

## Disclaimer

This tool was created for my buissness needs and includes some schemas for data import (LinkedIn, Phantombuster, Anymail, Tripadvisor).
To use this tool you will need to create your own schemas that map data from import services to your Close CRM data. 
That will require knowlage of programing in Javascript. It is not a ready to go solution and is presented as is.
If you have any problems/questions please open an issue, or contact me directly if you need help.

## Setup

1. Clone this repo: 
2. Install dependencies: `npm install`
3. Create `.env` file (check `.env.sample`)
4. Create `config.js` file (check `config.sample.js`)
5. Create `close.js` file (check `close.sample.js`)

## Running scripts

Scripts will use your configuration files you created

- Import: `npm run import`
- Deduplication: `npm run deduplicate`
- Reporting: `npm run report`
- Verify: `npm run verify`