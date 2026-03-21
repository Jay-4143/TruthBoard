const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email notification.
 * @param {string} to - Recipient email.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string} html - HTML content.
 */
const sendEmail = async (to, subject, text, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('[EMAIL] SMTP credentials missing. Skipping email.');
      return;
    }

    const info = await transporter.sendMail({
      from: `"TruthBoard Notifications" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log('[EMAIL] Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Error sending email:', error);
  }
};

module.exports = { sendEmail };
