const Notification = require('../models/Notification');
const { sendEmail } = require('./emailService');
const User = require('../models/User');

/**
 * Creates an in-app notification and optionally sends an email if priority is high.
 * @param {Object} data - Notification details.
 * @param {string} data.recipient - Recipient user ID.
 * @param {string} data.type - Notification type (e.g., 'NEW_REVIEW', 'REPLY', 'NEGATIVE_REVIEW').
 * @param {string} data.title - Notification title.
 * @param {string} data.message - Notification message.
 * @param {string} [data.reviewId] - Optional review ID.
 * @param {string} [data.link] - Optional link for the app UI.
 * @param {boolean} [data.emailHighPriority] - Whether to send an email notification as well.
 */
const createNotification = async (data) => {
  try {
    // 1. Create in-app notification
    const notification = await Notification.create({
      recipient: data.recipient,
      type: data.type,
      title: data.title,
      message: data.message,
      reviewId: data.reviewId,
      link: data.link || '/business/reviews'
    });

    // 2. If high priority, send email as well
    if (data.emailHighPriority) {
      const recipientUser = await User.findById(data.recipient);
      if (recipientUser && recipientUser.email) {
        const subject = `[TruthBoard] ${data.title}`;
        const text = `${data.message}\n\nView details: ${process.env.FRONTEND_URL || 'http://localhost:5173'}${data.link || '/business/reviews'}`;
        const html = `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #00b67a; margin-top: 0;">TruthBoard</h2>
            <h3 style="color: #111;">${data.title}</h3>
            <p style="color: #444; font-size: 16px;">${data.message}</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}${data.link || '/business/reviews'}" 
               style="display: inline-block; background: #00b67a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px;">
              View Review
            </a>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">
              This is an automated notification from TruthBoard. You can manage your notification preferences in your settings.
            </p>
          </div>
        `;
        
        await sendEmail(recipientUser.email, subject, text, html);
      }
    }

    return notification;
  } catch (error) {
    console.error('[NOTIFY] Error creating notification:', error);
  }
};

module.exports = { createNotification };
