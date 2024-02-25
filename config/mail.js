const nodemailer = require("nodemailer")
const logger = require('tracer').colorConsole({});
require('dotenv').config

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
});

module.exports = transporter;