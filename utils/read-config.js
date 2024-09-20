const configJson = require("../config.json");

function config(key) {
  if (key in configJson) return configJson[key];
  else return null;
}

module.exports = { config };
