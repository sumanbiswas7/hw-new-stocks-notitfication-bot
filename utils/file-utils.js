const fs = require("fs");
const path = require("path");
const { getTodayDateTime, getTodayDate } = require("./time-utils");
const { config } = require("./read-config");

function getFilePath(folder, fileName) {
  // Input example -> "data/kz/09.16.2024"
  return path.join(__dirname, "../" + folder, fileName);
}

async function saveJson({ title, count, folder }) {
  // Input example -> "data/kz/09.16.2024"
  const timestamp = getTodayDateTime();
  const filePath = getFilePath(folder, `${getTodayDate()}.json`);

  // Ensure directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Read the existing data
  let data = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileContent);
  }

  // Add the new stock data
  const infoData = {
    timestamp,
    count,
    title,
    interval: config("MINUTES_INTERVAL") + " min",
  };

  data.push(infoData);

  // Save the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function newStocksCount(folder, newCount) {
  const filePath = getFilePath(folder, `${getTodayDate()}.json`);

  // Ensure directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) return;

  // Read the existing data
  let data = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(fileContent);
  }

  const currCount = data[data.length - 1].count;
  if (typeof currCount === "number" && newCount - currCount > 0)
    return newCount - currCount;
  else return null;
}

module.exports = { saveJson, newStocksCount };
