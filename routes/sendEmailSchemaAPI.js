const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const email = require('../models/sendEmailSchema')

const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
  secure: false, // upgrades later with STARTTLS -- change this based on the PORT
});

// add one mail
router.post('/email', async (req, res) => {
  try {
    const createdEmail = await email.create(req.body)
    const mailData = {
      from: createdEmail.from,
      to: createdEmail.to,
      subject: createdEmail.subject,
      text: createdEmail.text,
    }
    const info = await transporter.sendMail(mailData);
    res.send({ message: "Mail send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//without mongodb
router.post('/html-mail', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const mailData = {
      from: 'iscae_meher@live.com',
      to: 'iscae_meher@live.com',
      subject: 'subject',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    const info = await transporter.sendMail(mailData);
    res.send({ message: "Mail send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//without mongodb
router.post('/html-mail/v2', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const mailData = {
      from: 'iscae_meher@live.com',
      to: 'iscae_meher@live.com',
      subject: 'subject',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };

    const info = await transporter.sendMail(mailData);
    res.send({ message: "Mail send", message_id: info.messageId });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;