const jsonfile = require('jsonfile')
const _ = require('lodash')
const psl = require('psl');

const file = 'leads.json';
const input = 'input/' + file;
const output = 'output/' + file;

const blacklist = [
  'facebook.com',
  'fb.me',
  'fb.com',
  'linkedin.com',
  'wp.pl',
  'onet.eu',
  'interia.pl',
  'home.pl'
];

function isBlacklisted(domain) {
  return blacklist.indexOf(domain) > -1;
}

function extractHostname(url) {
  var hostname;
  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
}

let domainCount = 0;
const json = jsonfile.readFileSync(input); 
const data = _.map(json, function (lead) {
  if (lead.url) {
    const domain = psl.get(extractHostname(lead.url));
    if (domain && !isBlacklisted(domain)) {
      lead.custom['Domain'] = domain;
      domainCount++;
    }
  }
  return lead;
});
console.log(domainCount);
return jsonfile.writeFileSync(output, data); 