const retry = require('./retry');

function retryableAction(action, resolve, reject, retried = false) {
  return action().then(
    (data) => resolve(data),
    (error) => retried
      ? reject(error)
      : retry(error, () => retryableAction(action, resolve, reject, true))
  );
}

function closeAction(action) {
  return new Promise((resolve, reject) =>
    retryableAction(action, resolve, reject)
  );
}

module.exports = closeAction;