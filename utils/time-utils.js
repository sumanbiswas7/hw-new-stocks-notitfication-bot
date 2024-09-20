// -> 09.18.2024 (MM.DD.YYYY)
function getTodayDate() {
  return new Date()
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", ".");
}

// -> 09/18/2024, 11:36:04 PM (MM.DD.YYYY, HH:MM:SS A)
function getTodayDateTime() {
  return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

module.exports = { getTodayDate, getTodayDateTime };
