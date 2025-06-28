// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const nodemailer = require('nodemailer');

// Save Order Route
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order', details: err });
  }
});

// Get All Orders Route
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ Send Invoice via Email
router.post('/send-invoice', async (req, res) => {
  const { email, pdfData } = req.body;

  if (!email || !pdfData) {
    return res.status(400).json({ error: 'Email and PDF data are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourEmail@gmail.com',         // 🔁 Replace
        pass: 'yourAppPassword'              // 🔁 Use app-specific password
      }
    });

    const mailOptions = {
      from: 'yourEmail@gmail.com',           // 🔁 Replace
      to: email,
      subject: 'Your Invoice',
      html: '<p>Thank you for your order. Please find the attached invoice.</p>',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfData.split("base64,")[1],
          encoding: 'base64'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Invoice sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ error: 'Failed to send invoice email' });
  }
});

module.exports = router;
