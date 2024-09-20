const { getHwCounKrazycaterpillar } = require("./scripts");
const { saveJson, config, log } = require("./utils");
const puppeteer = require("puppeteer");
const { newStocksCount } = require("./utils/file-utils");
const {
  getHwCounKarzAndDollz,
} = require("./scripts/get-hw-count-karzanddolls");
const { sendEmail } = require("./packages/email_options");

let browser = null;
async function main() {
  try {
    console.time("Execution Time");

    console.log("...");
    browser = await puppeteer.launch();

    // Scrape Available Stocks from Krazycaterpillar
    const count = await getHwCounKrazycaterpillar(browser);
    const kgTitle = "Krazycaterpillar available hw stocks";
    const newStocks = newStocksCount("data/krazycaterpillar", count);
    if (newStocks) {
      console.log(`🔥🔥 Krazycaterpillar new stocks -> ${newStocks}`);
      sendEmail(
        `🔥🔥 Krazycaterpillar new stocks -> ${newKdStocks}`,
        "https://krazycaterpillar.com/pages/search-results-page?collection=hot-wheels-mainline&page=1&rb_stock_status=In%20Stock"
      );
    }
    log(kgTitle, count);
    saveJson({
      count,
      folder: "data/krazycaterpillar",
      title: kgTitle,
    });

    // Scrape Available Stocks from KarzAndDolls
    const count2 = await getHwCounKarzAndDollz(browser);
    const kdTitle = "KarzAndDolls available hw stocks";
    const newKdStocks = newStocksCount("data/karzanddolls", count2);
    if (newKdStocks) {
      console.log(`🔥🔥 KarzAndDolls new stocks -> ${newKdStocks}`);
      sendEmail(
        `🔥🔥 KarzAndDolls new stocks -> ${newKdStocks}`,
        "https://www.karzanddolls.com/details/hotwheels/mainlines/MTEw"
      );
    }
    log(kdTitle, count2);
    saveJson({
      count,
      folder: "data/karzanddolls",
      title: kdTitle,
    });

    await browser.close();
  } catch (error) {
    console.log(`========== ERROR main() ==========`);
    console.log(error);
    console.log(`==================================`);
  } finally {
    if (browser) browser.close();
    console.timeEnd("Execution Time");
    console.log("--- end ---");
  }
}

// Run the checkStock function every 60 seconds (1 minute)
setInterval(main, config("MINUTES_INTERVAL") * 60 * 1000);

main();
