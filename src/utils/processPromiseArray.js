async function processPromiseArray(array) {
  let results = [];
  for (let promise of array) {
    let result = await promise();
    results.push(result);
  }
  return results;
}

module.exports = processPromiseArray;