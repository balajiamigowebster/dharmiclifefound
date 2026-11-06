const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('./mariadb');
const { sequelize, AdminUser, ContactMessage } = require('./models');
const { sendContactInquiryEmail } = require('./config/mailer');
const mediaRoutes = require('./routes/mediaRoutes');
const activityItemsRoutes = require('./routes/activityItemsRoutes');
const awardItemsRoutes = require('./routes/awardItemsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

const HOMEPAGE_FILE = path.join(__dirname, 'data', 'homepageContent.json');

// Helper to get homepage content
function getHomepageContent() {
  try {
    if (fs.existsSync(HOMEPAGE_FILE)) {
      return JSON.parse(fs.readFileSync(HOMEPAGE_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading homepage content:', err.message);
  }
  return null;
}

// Helper to save homepage content
function saveHomepageContent(data) {
  try {
    fs.mkdirSync(path.dirname(HOMEPAGE_FILE), { recursive: true });
    fs.writeFileSync(HOMEPAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving homepage content:', err.message);
    return false;
  }
}

// CORS Configuration for Local & Live Production (Vercel & cPanel amigowebster.in)
const allowedOrigins = [
  'https://dharmiclifefoundation.com',
  'https://www.dharmiclifefoundation.com',
  'http://dharmiclifefoundation.com',
  'http://www.dharmiclifefoundation.com',
  'https://client-e1mu.vercel.app',
  'https://amigowebster.in',
  'http://amigowebster.in',
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith('.vercel.app') ||
      origin.includes('dharmiclifefoundation.com') ||
      origin.includes('amigowebster.in')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all in production or fallback gracefully
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Strip '/dharmiclife' prefix if cPanel passes the full URL path to Node.js
app.use((req, res, next) => {
  if (req.url.startsWith('/dharmiclife/')) {
    req.url = req.url.replace('/dharmiclife', '');
  } else if (req.url === '/dharmiclife') {
    req.url = '/';
  }
  next();
});

// Serve static images if requested through backend as well
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'public', 'images')));

// Serve uploaded files (images and videos) statically
const serveStaticUploads = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use('/uploads', serveStaticUploads, express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', serveStaticUploads, express.static(path.join(__dirname, 'uploads')));
app.use('/dharmiclife/uploads', serveStaticUploads, express.static(path.join(__dirname, 'uploads')));

// Media Routes (Upload & Media Management)
app.use('/api/media', mediaRoutes);
app.use('/dharmiclife/api/media', mediaRoutes);

// Activity Items Routes (Sub-categories items with images and videos linked to DB)
app.use('/api/activity-items', activityItemsRoutes);
app.use('/dharmiclife/api/activity-items', activityItemsRoutes);

// Award Items Routes (Awards with images and tributes linked to DB)
app.use('/api/award-items', awardItemsRoutes);
app.use('/dharmiclife/api/award-items', awardItemsRoutes);

// Root & Health status
app.get(['/', '/dharmiclife', '/api/health', '/dharmiclife/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    message: 'Dharmic Life Foundation Backend is Live',
    applicationUrl: 'https://dharmiclifefoundation.com/',
    timestamp: new Date().toISOString(),
    database: db.getStatus()
  });
});


// Site Settings
app.get('/api/site-info', async (req, res) => {
  try {
    const settings = await db.getSiteSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch site settings' });
  }
});

// Core Activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await db.getActivities();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.get('/api/activities/:slug', async (req, res) => {
  try {
    const activity = await db.getActivityBySlug(req.params.slug);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await db.getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await db.getTestimonials();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Blog Posts
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await db.getBlogPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Team Members / Trustees
app.get('/api/team', async (req, res) => {
  try {
    const team = await db.getTeamMembers();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Trust Information
app.get('/api/trust', async (req, res) => {
  try {
    const trust = await db.getTrustInfo();
    res.json(trust);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trust information' });
  }
});

// Gallery Images
app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await db.getGalleryImages();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Submit Donation
app.post('/api/donations', async (req, res) => {
  try {
    const { donor_name, donor_email, donor_phone, amount, cause, payment_method } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid donation amount is required' });
    }
    const donation = await db.createDonation({
      donor_name,
      donor_email,
      donor_phone,
      amount,
      cause,
      payment_method
    });
    res.status(201).json({
      success: true,
      message: 'Thank you for your generous contribution in upholding Dharma!',
      donation
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

// Volunteer Registration
app.post('/api/volunteer', async (req, res) => {
  try {
    const { full_name, email, phone, skills, message } = req.body;
    if (!full_name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
    }
    const volunteer = await db.createVolunteer({
      full_name,
      email,
      phone,
      skills,
      message
    });
    res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully. Our team will contact you soon!',
      volunteer
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit volunteer application' });
  }
});

// Contact Query - Store in Table & Send Email to cPanel with CC to Google Mail
app.post(['/api/contact', '/dharmiclife/api/contact'], async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    let savedMessage = null;

    // 1. Store in DB table using Sequelize model
    try {
      if (ContactMessage) {
        savedMessage = await ContactMessage.create({
          name: String(name).trim(),
          email: String(email).trim(),
          phone: String(phone || '').trim(),
          subject: String(subject || '').trim(),
          message: String(message).trim(),
          status: 'unread',
          emailSent: false
        });
      }
    } catch (dbErr) {
      console.warn('Sequelize insert warning for contact_messages:', dbErr.message);
    }

    // Fallback/sync to mariadb pool/localStore if Sequelize did not capture it
    if (!savedMessage) {
      savedMessage = await db.createContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });
    }

    // 2. Dispatch Email via cPanel SMTP with CC to Google Mail
    let emailResult = { success: false };
    try {
      emailResult = await sendContactInquiryEmail({
        name,
        email,
        phone,
        subject,
        message
      });
      if (emailResult.success) {
        if (savedMessage && typeof savedMessage.update === 'function') {
          await savedMessage.update({ emailSent: true }).catch(() => {});
        }
        if (savedMessage && savedMessage.id) {
          await db.updateContactMessageEmailSent(savedMessage.id).catch(() => {});
        }
      }
    } catch (mailErr) {
      console.error('Email dispatch error on contact submission:', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you soon.',
      contactMsg: savedMessage,
      emailSent: emailResult.success
    });
  } catch (err) {
    console.error('Failed to submit contact form:', err);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Test Mail Diagnostics Endpoint
app.get(['/api/test-email-status', '/dharmiclife/api/test-email-status'], async (req, res) => {
  const result = {
    nodemailerLoaded: false,
    transporterConfig: null,
    verifyResult: null,
    verifyError: null,
    sendResult: null,
    catchError: null
  };

  try {
    const { getTransporter, sendContactInquiryEmail } = require('./config/mailer');
    const transporter = getTransporter();

    if (!transporter) {
      result.error = 'Transporter could not be created. Check if nodemailer is installed.';
      return res.json(result);
    }

    result.nodemailerLoaded = true;
    result.transporterConfig = {
      host: transporter.options?.host,
      port: transporter.options?.port,
      secure: transporter.options?.secure,
      user: transporter.options?.auth?.user,
      hasPassword: !!transporter.options?.auth?.pass
    };

    try {
      result.verifyResult = await transporter.verify();
    } catch (vErr) {
      result.verifyError = vErr.message;
    }

    const testSend = await sendContactInquiryEmail({
      name: 'Diagnostic Checker',
      email: 'test@dharmiclifefoundation.com',
      phone: '9999999999',
      subject: 'Live cPanel Mail Test',
      message: 'Checking if cPanel Node.js dispatches email.'
    });
    result.sendResult = testSend;
  } catch (err) {
    result.catchError = err.message;
  }

  res.json(result);
});

// Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }
    await db.createSubscriber(email);
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Dharmic Life Foundation updates.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Admin Login (using DB AdminUser with bcrypt hashed password)
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password is required' });
    }

    const inputUser = (username || 'admin').trim();

    // Find admin user in DB table
    let admin = await AdminUser.findOne({ where: { username: inputUser } });

    // Fallback search for any admin if username was omitted
    if (!admin && !username) {
      admin = await AdminUser.findOne();
    }

    if (!admin) {
      // Check against .env as fallback if DB table is initializing
      const envUser = process.env.ADMIN_USERNAME || 'admin';
      const envPass = process.env.ADMIN_PASSWORD || 'admin123';
      if (inputUser === envUser && password === envPass) {
        return res.json({
          success: true,
          token: 'admin-token-' + Date.now(),
          user: { username: envUser, role: 'admin' },
          message: 'Admin authentication successful'
        });
      }
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Verify bcrypt hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      // Also allow direct match if it was stored as plain text originally
      if (password === admin.password) {
        // Upgrade to hash automatically
        const newHash = await bcrypt.hash(password, 10);
        admin.password = newHash;
        await admin.save();
      } else {
        return res.status(401).json({ success: false, error: 'Invalid username or password' });
      }
    }

    return res.json({
      success: true,
      token: 'admin-token-' + Date.now(),
      user: { username: admin.username, role: admin.role },
      message: 'Admin authentication successful'
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Authentication failed due to server error' });
  }
});

// GET Homepage Content
app.get('/api/homepage', (req, res) => {
  const content = getHomepageContent();
  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ error: 'Homepage content not found' });
  }
});

// PUT Homepage Content (Admin update)
app.put('/api/homepage', (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid content data' });
  }
  const ok = saveHomepageContent(data);
  if (ok) {
    res.json({ success: true, message: 'Homepage content updated successfully', content: data });
  } else {
    res.status(500).json({ error: 'Failed to write homepage content' });
  }
});

// GET Contact Inquiries for Admin
app.get(['/api/admin/messages', '/dharmiclife/api/admin/messages'], async (req, res) => {
  try {
    if (ContactMessage) {
      try {
        const messages = await ContactMessage.findAll({
          order: [['createdAt', 'DESC']]
        });
        if (messages && messages.length > 0) {
          return res.json(messages.map(m => m.toJSON()));
        }
      } catch (seqErr) {
        console.warn('Sequelize fetch messages warning:', seqErr.message);
      }
    }
    const messages = await db.getContactMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// DELETE Contact Inquiry
app.delete(['/api/admin/messages/:id', '/dharmiclife/api/admin/messages/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    if (ContactMessage) {
      try {
        await ContactMessage.destroy({ where: { id } });
      } catch (seqErr) {
        console.warn('Sequelize delete message warning:', seqErr.message);
      }
    }
    await db.deleteContactMessage(id);
    res.json({ success: true, message: 'Message removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Global 404 Handler for undefined API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.originalUrl });
});

// Global Error Handling Middleware (catches Multer file size errors, validation errors, etc.)
app.use((err, req, res, next) => {
  console.error('[Server Error Handler]:', err);
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, error: 'File size too large. Maximum allowed size is 100MB.' });
    }
    return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
  }
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error occurred'
  });
});

// Prevent process from crashing on unexpected asynchronous rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection at Promise]:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err);
});

// Start HTTP server immediately so cPanel Passenger and health checks connect instantly
app.listen(PORT, () => {
  console.log(`🚀 Dharmic Life Foundation API Server running on port ${PORT}`);
});

// Sync database models and initialize admin user asynchronously in background
(async () => {
  try {
    await sequelize.authenticate();
    console.log('[Sequelize] Connection established successfully.');
    await sequelize.sync({ alter: true });
    console.log('[Sequelize] Database models synchronized with database.');

    const envAdminUser = (process.env.ADMIN_USERNAME || 'admin').trim();
    const envAdminPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();

    try {
      let existingAdmin = await AdminUser.findOne({ where: { username: envAdminUser } });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(envAdminPass, 10);
        await AdminUser.create({
          username: envAdminUser,
          password: hashedPassword,
          email: 'admin@dharmiclife.org',
          role: 'superadmin'
        });
        console.log(`[AdminUser] Created initial admin user "${envAdminUser}" with bcrypt hashed password in DB table.`);
      } else {
        const matches = await bcrypt.compare(envAdminPass, existingAdmin.password);
        if (!matches) {
          existingAdmin.password = await bcrypt.hash(envAdminPass, 10);
          await existingAdmin.save();
          console.log(`[AdminUser] Updated admin "${envAdminUser}" password hash in DB from .env.`);
        }
      }
    } catch (adminErr) {
      console.warn('[AdminUser] Note on admin sync:', adminErr.message);
    }
  } catch (err) {
    console.error('[Sequelize Warning] Database connection failed or not yet reachable:', err.message);
  }
})();

module.exports = app;
