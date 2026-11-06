const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config();

let nodemailer = null;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.warn('[Mailer Warning] nodemailer is not installed yet. In cPanel, click "Run NPM Install".');
}

// Extract credentials from standard or custom environment variables
const smtpUser = process.env.SMTP_USER || process.env['cpanel email'] || 'info@dharmiclifefoundation.com';
const smtpPass = process.env.SMTP_PASS || process.env.password || 'Dharmiclifefoundation@2026';
const smtpHost = process.env.SMTP_HOST || 'mail.dharmiclifefoundation.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465;

const notificationTo = process.env.NOTIFICATION_EMAIL || 'info@dharmiclifefoundation.com';

function resolveNotificationCc() {
  const envCc = (process.env.NOTIFICATION_CC_EMAIL || '').trim();
  if (!envCc || envCc.includes('dharmiclifefoundation@gmail.com') || envCc.includes('dharmiclifefondation@gmail.com')) {
    return 'dharmiclifestyle@gmail.com';
  }
  return envCc;
}

const notificationCc = resolveNotificationCc();

let transporter = null;

function getTransporter() {
  if (!nodemailer) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return transporter;
}

/**
 * Send contact inquiry email to cPanel inbox with CC to Google mail
 */
async function sendContactInquiryEmail({ name, email, phone, subject, message }) {
  if (!nodemailer) {
    console.warn('[Mailer] nodemailer module is not installed on server yet. Message saved to database.');
    return { success: false, error: 'nodemailer module not installed. Please click "Run NPM Install" in cPanel.' };
  }

  try {
    const mailer = getTransporter();
    if (!mailer) {
      return { success: false, error: 'Failed to initialize mailer transporter' };
    }

    const safeName = String(name || 'Website Visitor').trim();
    const safeEmail = String(email || '').trim();
    const safePhone = String(phone || 'Not provided').trim();
    const safeSubject = String(subject || 'General Inquiry').trim();
    const safeMessage = String(message || '').trim().replace(/\n/g, '<br/>');
    const sentTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 24px; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e5e5; }
        .header { background: linear-gradient(135deg, #701c22 0%, #901C25 100%); color: #ffffff; padding: 28px 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #f2c7a1; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .body-content { padding: 32px; }
        .badge { display: inline-block; background: #FAF7F2; border: 1px solid #EEDAC5; color: #8B2613; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .info-table td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
        .info-table td.label { width: 140px; font-weight: bold; color: #666; }
        .info-table td.value { color: #111; }
        .message-box { background: #faf8f5; border-left: 4px solid #901C25; padding: 18px 20px; border-radius: 0 12px 12px 0; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #222; }
        .footer { background: #f2ece4; padding: 18px 32px; text-align: center; font-size: 12px; color: #735a4e; border-top: 1px solid #e3d5c5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Dharmic Life Foundation</h1>
          <p>Website Contact Inquiry</p>
        </div>
        <div class="body-content">
          <div class="badge">✦ New Submission Received</div>
          
          <table class="info-table">
            <tr>
              <td class="label">Sender Name:</td>
              <td class="value"><strong>${safeName}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td class="value"><a href="mailto:${safeEmail}" style="color: #901C25; font-weight: bold; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td class="label">Phone Number:</td>
              <td class="value">${safePhone}</td>
            </tr>
            <tr>
              <td class="label">Subject:</td>
              <td class="value"><strong>${safeSubject}</strong></td>
            </tr>
            <tr>
              <td class="label">Submission Time:</td>
              <td class="value">${sentTime} (IST)</td>
            </tr>
          </table>

          <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; color: #8B2613; letter-spacing: 0.5px; margin-bottom: 6px;">
            Message Content:
          </div>
          <div class="message-box">
            ${safeMessage}
          </div>
        </div>
        <div class="footer">
          Dharmic Life Foundation • Upholding Dharma, Conduct & Compassion<br/>
          This notification was automatically dispatched from the official website contact form.
        </div>
      </div>
    </body>
    </html>
    `;

    const activeCc = resolveNotificationCc();

    const mailOptions = {
      from: `"Dharmic Life Foundation" <${smtpUser}>`,
      to: notificationTo,
      cc: activeCc,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `[Website Inquiry] ${safeSubject} - from ${safeName}`,
      text: `New Website Inquiry:\n\nName: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nSubject: ${safeSubject}\nDate: ${sentTime}\n\nMessage:\n${String(message || '').trim()}\n`,
      html: htmlContent
    };

    console.log(`[Mailer] Dispatching to ${notificationTo} with CC: ${activeCc}`);
    const info = await mailer.sendMail(mailOptions);
    console.log('✅ Contact form notification email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId, cc: activeCc };
  } catch (err) {
    console.error('❌ Failed to send contact notification email:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = {
  sendContactInquiryEmail,
  getTransporter,
  resolveNotificationCc
};
