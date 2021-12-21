const { builder } = require("@netlify/functions");
const fs = require("fs")
const path = require("path")

// See for date conversion: https://stackoverflow.com/a/15289883
const _MS_PER_MINUTE = 1000 * 60;
const _MS_PER_DAY = _MS_PER_MINUTE * 60 * 24;
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function dateDiffInMinutes(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_MINUTE);
}

const hawaiiDate = new Date("2022-09-01")
const timeUntilHawaii = dateDiffInDays(new Date(), hawaiiDate);
exports.timeUntilHawaii = timeUntilHawaii;
exports.minutesUntilHawaii = dateDiffInMinutes(new Date(), hawaiiDate);

const dayString = "DAY_COUNTER_VAR"
const fileName = "./_index.html"
var raw_data = fs.readFileSync(require.resolve(fileName), "utf8").toString()
raw_data = raw_data.replace(dayString, timeUntilHawaii)

const handler = async event => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: raw_data,
    ttl: 1800,
  };
}

exports.handler = builder(handler);
