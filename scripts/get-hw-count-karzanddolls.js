const cheerio = require("cheerio");

const url = "https://www.karzanddolls.com/details/hotwheels/mainlines/MTEw";

async function getHwCounKarzAndDollz(browser) {
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for a specific element to appear
    await page.waitForSelector("#prod_count", {
      timeout: 10000,
    });

    // Get the content
    const content = await page.content();
    const $ = cheerio.load(content);
    const resultsText = $("#prod_count").text();

    return extractCount(resultsText);
  } catch (error) {
    console.log(`========== ERROR getHwCounKrazycaterpillar() ==========`);
    console.log(error);
    console.log(`==================================`);
  }
}

/**
 * =====================
 * ====== UTILS ========
 * =====================
 */

function extractCount(text) {
  // Use regular expression to match digits
  const numberMatch = text.match(/\d+/);
  return numberMatch ? parseInt(numberMatch[0], 10) : null;
}

module.exports = { getHwCounKarzAndDollz };
