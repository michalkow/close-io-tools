const { sumBy } = require('lodash');
const moment = require('moment-timezone');
const countLeads = require('../src/close/countLeads');
const activityReport = require('../src/close/activityReport');
const { user } = require('../src/constants/close');
const processPromiseArray = require('../src/utils/processPromiseArray');
const writeCsvFileFromJson = require('../src/utils/writeCsvFileFromJson');


const metric = {
  emails: {
    SENT: 'emails.sent.all.count',
    OPENED: 'emails.opened.all.count',
    REPLY_BULK: 'emails.sent.bulk_with_reply.count',
    REPLY_MANUAL: 'emails.sent.manual_with_reply.count',
  }
}

const column = {
  USER: 'User',
  SENT: 'Sent',
  OPENED: 'Opened',
  RESPONDED: 'Responded',
  OPENED_RATE: 'Opened Rate',
  RESPONDED_RATE: 'Responded Rate',
  LEADS_SENT: 'Leads Sent',
  LEADS_OPENED: 'Leads Opened',
  LEADS_RESPONDED: 'Leads Responded',
  LEADS_INTRESTED: 'Leads Intrested',
  LEADS_CLOSED: 'Leads Closed',
  LEADS_OPENED_RATE: 'Leads Opened Rate',
  LEADS_RESPONDED_RATE: 'Leads Responded Rate',
  LEADS_INTRESTED_RATE: 'Leads Intrested Rate',
  LEADS_CLOSED_RATE: 'Leads Closed Rate',
}

function createReportRequest({ user, fromDate, toDate }) {
  return {
    'datetime_range': {
      'start': moment(fromDate).startOf('day').tz('Europe/Warsaw').format(),
      'end': moment(toDate).endOf('day').tz('Europe/Warsaw').format()
    },
    'users': [
      user.id,
    ],
    'type': 'overview',
    'metrics': [
      metric.emails.SENT,
      metric.emails.OPENED,
      metric.emails.REPLY_BULK,
      metric.emails.REPLY_MANUAL,
    ],
  };
}

function calculateRate(sent, interaction = 0) {
  return (sent ? Math.round(interaction / sent * 100) : 0) + '%';
}

async function userReport({ user, dateRange }) {
  const [fromDate, toDate] = dateRange;
  const { aggregations: { totals } } = await activityReport(createReportRequest({ fromDate, toDate, user }));
  let report = {};
  report[column.USER] = user.name;
  report[column.SENT] = totals[metric.emails.SENT];
  report[column.OPENED] = totals[metric.emails.OPENED];
  report[column.OPENED_RATE] = calculateRate(report[column.SENT], report[column.OPENED]);
  report[column.RESPONDED] = totals[metric.emails.REPLY_BULK] + totals[metric.emails.REPLY_MANUAL];
  report[column.RESPONDED_RATE] = calculateRate(report[column.SENT], report[column.RESPONDED]);
  report[column.LEADS_SENT] = await countLeads({ query: `email(direction:sent user:"${user.name}" sent >= ${fromDate} sent <= ${toDate})` });
  report[column.LEADS_OPENED] = await countLeads({ query: `email(direction:sent opened:yes user:"${user.name}" sent >= ${fromDate} sent <= ${toDate})` });
  report[column.LEADS_OPENED_RATE] = calculateRate(report[column.LEADS_SENT], report[column.LEADS_OPENED]);
  report[column.LEADS_RESPONDED] = await countLeads({ query: `email(direction:sent has_reply:yes user:"${user.name}" sent >= ${fromDate} sent <= ${toDate})` });
  report[column.LEADS_RESPONDED_RATE] = calculateRate(report[column.LEADS_SENT], report[column.LEADS_RESPONDED]);
  report[column.LEADS_INTRESTED] = await countLeads({ query: `email(direction:sent has_reply:yes user:"${user.name}" sent >= ${fromDate} sent <= ${toDate}) lead_status in ("Qualified", "Interested")` });
  report[column.LEADS_INTRESTED_RATE] = calculateRate(report[column.LEADS_SENT], report[column.LEADS_INTRESTED_RATE]);
  report[column.LEADS_CLOSED] = await countLeads({ query: `email(direction:sent has_reply:yes user:"${user.name}" sent >= ${fromDate} sent <= ${toDate}) lead_status in ("Customer")` });
  report[column.LEADS_CLOSED_RATE] = calculateRate(report[column.LEADS_SENT], report[column.LEADS_CLOSED]);
  return report;
}

function calculateTotals(results) {
  let totals = {};
  totals[column.USER] = 'TOTALS';
  totals[column.SENT] = sumBy(results, column.SENT);
  totals[column.OPENED] = sumBy(results, column.OPENED);
  totals[column.OPENED_RATE] = calculateRate(totals[column.SENT], totals[column.OPENED]);
  totals[column.RESPONDED] = sumBy(results, column.RESPONDED);
  totals[column.RESPONDED_RATE] = calculateRate(totals[column.SENT], totals[column.RESPONDED]);
  totals[column.LEADS_SENT] = sumBy(results, column.LEADS_SENT);
  totals[column.LEADS_OPENED] = sumBy(results, column.LEADS_OPENED);
  totals[column.LEADS_OPENED_RATE] = calculateRate(totals[column.LEADS_SENT], totals[column.LEADS_OPENED]);
  totals[column.LEADS_RESPONDED] = sumBy(results, column.LEADS_RESPONDED);
  totals[column.LEADS_RESPONDED_RATE] = calculateRate(totals[column.LEADS_SENT], totals[column.LEADS_RESPONDED]);
  totals[column.LEADS_INTRESTED] = sumBy(results, column.LEADS_INTRESTED);
  totals[column.LEADS_INTRESTED_RATE] = calculateRate(totals[column.LEADS_SENT], totals[column.LEADS_INTRESTED_RATE]);
  totals[column.LEADS_CLOSED] = sumBy(results, column.LEADS_CLOSED);
  totals[column.LEADS_CLOSED_RATE] = calculateRate(totals[column.LEADS_SENT], totals[column.LEADS_CLOSED]);
  return totals;
}

async function createReport({ debug, dateRange, userNames }) {
  const results = await processPromiseArray(userNames.map(userName => () => userReport({ user: user[userName], dateRange })));
  const totals = calculateTotals(results);
  const report = [...results, totals];
  writeCsvFileFromJson(`output/close_report_${dateRange[0]}-${dateRange[1]}.csv`, report);
  return report.map(row => ({ debug: row }))
}

module.exports = createReport;