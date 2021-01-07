const closeio = require('./closeio');
const closeAction = require('./closeAction');

function activityReport(options) {
  return closeAction(() => closeio.report.activity(options));
}

module.exports = activityReport;