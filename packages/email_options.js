const Nodemailer = require("nodemailer");
require("dotenv").config();

// Email to receive messages also used throughout whole website
const MY_EMAIL = "hellosumanbiswas@gmail.com";

async function sendEmail(message, link) {
  try {
    const transporter = Nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MY_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: MY_EMAIL,
      subject: "HotWheels Stocks Update",
      html: `<h3>${message}</h3>
             <a href=${link}>${link}</a>
            `,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail };
