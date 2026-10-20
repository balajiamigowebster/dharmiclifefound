require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./mariadb');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images if requested through backend as well
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'public', 'images')));

// API Routes

// Health & DB status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
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

// Contact Query
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const contactMsg = await db.createContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });
    res.status(201).json({
      success: true,
      message: 'Message received! We will get back to you promptly.',
      contactMsg
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dharmic Life Foundation API Server running on http://localhost:${PORT}`);
});
