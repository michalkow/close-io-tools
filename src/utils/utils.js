const { intersectionBy, each, findIndex } = require('lodash');

function conditionalAssignField(condition, field) {
  return condition ? { [field]: condition } : {};
}

function conditionalAssign(condition, assign) {
  return condition ? assign : {};
}

function hasLeadField(lead, field) {
  return !!(lead && lead.custom && lead.custom[field]);
}

function hasInArray(a = [], b = [], value) {
  return !!intersectionBy(a, b, value).length;
}

function upsertItem(array, item, matcher, merger) {
  let index = findIndex(array, (leadContact) => matcher(leadContact, item));
  if (index > -1)
    array[index] = merger(array[index], item);
  else
    array.push(item)
}

function upsertItems(target, items, matcher, merger) {
  const array = target ? [...target] : [];
  each(items, item =>
    upsertItem(array, item, matcher, merger)
  );
  return array;
}


module.exports = {
  conditionalAssignField,
  conditionalAssign,
  upsertItems,
  upsertItem,
  hasLeadField,
  hasInArray
};