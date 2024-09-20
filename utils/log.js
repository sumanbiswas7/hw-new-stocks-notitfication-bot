const { getTodayDateTime } = require("./time-utils");

function log(title, count) {
  console.log(`${getTodayDateTime()} || ${title} -> ${count}`);
}

module.exports = { log };
