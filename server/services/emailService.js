const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, // true for port 465 (SSL)
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
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS ||
        process.env.EMAIL_USER === 'your-email@gmail.com') {
      console.warn('[EMAIL] SMTP credentials not configured. Skipping email to:', to);
      console.warn('[EMAIL] Would have sent:', { to, subject });
      return;
    }

    const info = await transporter.sendMail({
      from: `"TruthBoard" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log('[EMAIL] Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Error sending email:', error.message);
    // Don't throw — let the calling code continue even if email fails
  }
};

module.exports = { sendEmail };
