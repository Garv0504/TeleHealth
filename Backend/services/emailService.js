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

async function sendEmail({ email, subject, message }) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    // Update notification status
    await Notification.updateOne(
      { email, content: message },
      { status: "sent", sentAt: Date.now() }
    );
  } catch (err) {
    console.error("Email sending failed:", err);
    await Notification.updateOne(
      { email, content: message },
      { status: "failed" }
    );
  }
}

module.exports = { sendEmail };
