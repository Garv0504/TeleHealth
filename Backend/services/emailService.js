const nodemailer = require("nodemailer");
const Notification = require("../models/Notification");

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail({ email, subject, message, html }) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text: message || "", // fallback if no plain text
      html: html || "", // use html if provided
    };

    await transporter.sendMail(mailOptions);

    // Update notification status
    await Notification.updateOne(
      { email, content: message || html },
      { status: "sent", sentAt: Date.now() }
    );
  } catch (err) {
    console.error("Email sending failed:", err);
    await Notification.updateOne(
      { email, content: message || html },
      { status: "failed" }
    );
  }
}

module.exports = { sendEmail };
