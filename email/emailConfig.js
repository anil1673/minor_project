const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    }
    
  })

module.exports={transporter};