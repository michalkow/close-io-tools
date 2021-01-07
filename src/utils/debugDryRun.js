const { get, set } = require('lodash');

function getDebugStat(type) {
  return get(global, `debugStats.${type}`, 0);
}

function increseDebugStat(type) {
  return set(global, `debugStats.${type}`, getDebugStat(type) + 1);
}

function debugDryRun(dataKey, lead, query) {
  let leadName = lead ? ` > "${lead.name}"` : '';
  let leadQuery = lead && query ? ` = ${query}` : '';
  if (lead) 
    increseDebugStat('update');
  else 
    increseDebugStat('create');
  let result = `[${(lead ? 'u' : 'c')}] "${dataKey}"${leadName} [c:${getDebugStat('create')}/u:${getDebugStat('update')}]${leadQuery}`;
  return result;
}

module.exports = debugDryRun;