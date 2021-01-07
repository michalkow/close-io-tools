function retry(error, action) {
  const timeout = error.error && error.error.rate_reset ? Math.ceil(error.error.rate_reset * 1000) : 2000;
  setTimeout(
    () => action(), 
    timeout
  );
}

module.exports = retry;