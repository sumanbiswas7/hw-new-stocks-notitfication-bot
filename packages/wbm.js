const wbm = require("wbm");

function sendWpMessage() {
  wbm
    .start()
    .then(async () => {
      const phones = ["+919679114014"];
      const message = "Good Morning.";
      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err) => console.log(err));
}

module.exports = { sendWpMessage };
