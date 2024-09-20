const cheerio = require("cheerio");

const url =
  "https://krazycaterpillar.com/pages/search-results-page?collection=hot-wheels-mainline&page=1&rb_stock_status=In%20Stock";

async function getHwCounKrazycaterpillar(browser) {
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for a specific element to appear
    await page.waitForSelector(".snize-main-panel-collection-results-found", {
      timeout: 10000,
    });

    // Get the content
    const content = await page.content();
    const $ = cheerio.load(content);
    const resultsText = $(".snize-main-panel-collection-results-found").text();

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
  // Showing 66 results for "Hot Wheels Mainline Cars"
  const match = text.match(/Showing\s(\d+)\sresults/);
  if (match && match[1]) return parseInt(match[1], 10);

  return null;
}

module.exports = { getHwCounKrazycaterpillar };
