const Invite = require('../models/Invite');
const Company = require('../models/Company');
const { sendEmail } = require('../services/emailService');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Build the branded HTML email for a review invitation.
 */
const buildInviteEmail = (companyName, reviewLink) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1c21; padding: 32px 40px; text-align: center;">
        <h1 style="color: #00b67a; margin: 0; font-size: 28px; letter-spacing: -0.5px;">⭐ TruthBoard</h1>
      </div>
      <div style="padding: 40px;">
        <h2 style="color: #1a1c21; margin-top: 0; font-size: 22px;">You've been invited to share your experience!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          <strong>${companyName}</strong> would love to hear about your experience. Your honest feedback helps other customers make better decisions.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${reviewLink}" 
             style="display: inline-block; background: #00b67a; color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">
            Write Your Review
          </a>
        </div>
        <p style="color: #888; font-size: 13px; text-align: center; margin-top: 32px; border-top: 1px solid #eee; padding-top: 20px;">
          This invitation was sent by ${companyName} through TruthBoard.<br/>
          If you don't want to leave a review, you can simply ignore this email.
        </p>
      </div>
    </div>
  `;
};

/**
 * POST /api/invite — Send a single review invitation email.
 */
const sendInvite = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Find the company claimed by this business user
    const company = await Company.findOne({ claimedBy: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'You must claim a company before sending invites' });
    }

    // Check for duplicate invite (same company + email, still pending)
    const existingInvite = await Invite.findOne({
      companyId: company._id,
      email: email.toLowerCase(),
      status: 'pending'
    });
    if (existingInvite) {
      return res.status(400).json({ message: 'An invitation has already been sent to this email' });
    }

    // Create invite record
    const invite = await Invite.create({
      companyId: company._id,
      sentBy: req.user._id,
      email: email.toLowerCase()
    });

    // Build review link with token
    const reviewLink = `${FRONTEND_URL}/write-review?token=${invite.token}`;
    const subject = `${company.name} wants to hear from you!`;
    const text = `You've been invited to review ${company.name}. Visit: ${reviewLink}`;
    const html = buildInviteEmail(company.name, reviewLink);

    await sendEmail(email, subject, text, html);

    res.status(201).json({
      message: 'Invitation sent successfully',
      invite: {
        _id: invite._id,
        email: invite.email,
        status: invite.status,
        sentAt: invite.sentAt
      }
    });
  } catch (error) {
    console.error('[INVITE] Error sending invite:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/invite/bulk — Send bulk review invitations.
 */
const sendBulkInvite = async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of emails' });
    }

    if (emails.length > 50) {
      return res.status(400).json({ message: 'Maximum 50 invitations per batch' });
    }

    const company = await Company.findOne({ claimedBy: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'You must claim a company before sending invites' });
    }

    const results = { sent: 0, skipped: 0, failed: 0, details: [] };

    for (const rawEmail of emails) {
      const email = rawEmail.trim().toLowerCase();

      if (!EMAIL_REGEX.test(email)) {
        results.skipped++;
        results.details.push({ email, status: 'skipped', reason: 'Invalid email format' });
        continue;
      }

      // Check for existing pending invite
      const existing = await Invite.findOne({ companyId: company._id, email, status: 'pending' });
      if (existing) {
        results.skipped++;
        results.details.push({ email, status: 'skipped', reason: 'Already invited' });
        continue;
      }

      try {
        const invite = await Invite.create({
          companyId: company._id,
          sentBy: req.user._id,
          email
        });

        const reviewLink = `${FRONTEND_URL}/write-review?token=${invite.token}`;
        const subject = `${company.name} wants to hear from you!`;
        const text = `You've been invited to review ${company.name}. Visit: ${reviewLink}`;
        const html = buildInviteEmail(company.name, reviewLink);

        await sendEmail(email, subject, text, html);

        results.sent++;
        results.details.push({ email, status: 'sent' });
      } catch (err) {
        results.failed++;
        results.details.push({ email, status: 'failed', reason: err.message });
      }

      // Delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    res.json({
      message: `Bulk invite complete: ${results.sent} sent, ${results.skipped} skipped, ${results.failed} failed`,
      results
    });
  } catch (error) {
    console.error('[INVITE] Error in bulk invite:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/invite/history — Get invite history for the business user's company.
 */
const getInviteHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const company = await Company.findOne({ claimedBy: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Invite.countDocuments({ companyId: company._id });
    const invites = await Invite.find({ companyId: company._id })
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      invites,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/invite/verify/:token — Verify an invite token and return company info.
 */
const verifyInviteToken = async (req, res) => {
  try {
    const { token } = req.params;

    const invite = await Invite.findOne({ token }).populate('companyId', 'name slug website logo');
    if (!invite) {
      return res.status(404).json({ message: 'Invalid or expired invitation link' });
    }

    if (invite.status === 'completed') {
      return res.status(400).json({ message: 'This invitation has already been used' });
    }

    res.json({
      company: invite.companyId,
      email: invite.email,
      token: invite.token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendInvite,
  sendBulkInvite,
  getInviteHistory,
  verifyInviteToken
};
