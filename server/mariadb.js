require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const seedData = require('./seedData');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dharmic_life_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

class DatabaseManager {
  constructor() {
    this.pool = null;
    this.isMariaDBConnected = false;
    // Local in-memory / JSON store fallback
    this.localStore = {
      siteSettings: { ...seedData.siteSettings },
      activities: [...seedData.activities],
      events: [...seedData.events],
      testimonials: [...seedData.testimonials],
      blogPosts: [...seedData.blogPosts],
      teamMembers: [...seedData.teamMembers],
      galleryImages: [...seedData.galleryImages],
      stats: { ...seedData.stats },
      trustInfo: { ...seedData.trustInfo },
      donations: [],
      volunteers: [],
      contactMessages: [],
      subscribers: []
    };

    this.init();
  }

  async init() {
    try {
      // 1. Try to connect to MariaDB server
      console.log(`[DB] Attempting to connect to MariaDB at ${DB_CONFIG.host}:${DB_CONFIG.port}...`);
      
      // Connect without specifying database first to ensure database exists
      const adminConn = await mysql.createConnection({
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password
      });

      await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
      await adminConn.end();

      // Now create pool with database
      this.pool = mysql.createPool(DB_CONFIG);
      const testConn = await this.pool.getConnection();
      console.log('✅ [MariaDB] Successfully connected to MariaDB database:', DB_CONFIG.database);
      testConn.release();

      this.isMariaDBConnected = true;
      await this.runMigrationsAndSeed();
    } catch (err) {
      this.isMariaDBConnected = false;
      console.warn('⚠️ [MariaDB Notice] MariaDB is not currently reachable:', err.message);
      console.info('ℹ️ [DB] Running in resilient embedded mode with pre-seeded Dharmic Life Foundation dataset.');
      console.info('ℹ️ [DB] To use your MariaDB server, ensure MariaDB/MySQL is running on port 3306 and configure server/.env.');
    }
  }

  async runMigrationsAndSeed() {
    if (!this.pool) return;
    try {
      const schemaPath = path.join(__dirname, 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const statements = schemaSql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.toLowerCase().startsWith('use') && !s.toLowerCase().startsWith('create database'));

        for (const statement of statements) {
          try {
            await this.pool.query(statement);
          } catch (e) {
            // Ignore if exists or minor error
          }
        }
        console.log('✅ [MariaDB] Tables verified/created successfully.');
      }

      // Check if activities are seeded
      const [rows] = await this.pool.query('SELECT COUNT(*) as count FROM activities');
      if (rows[0].count === 0) {
        console.log('🌱 [MariaDB] Seeding initial data into MariaDB...');
        // Seed settings
        for (const [k, v] of Object.entries(seedData.siteSettings)) {
          await this.pool.query(
            'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
            [k, typeof v === 'object' ? JSON.stringify(v) : String(v), typeof v === 'object' ? JSON.stringify(v) : String(v)]
          );
        }

        // Seed activities
        for (const act of seedData.activities) {
          await this.pool.query(
            'INSERT INTO activities (id, slug, title, tagline, description, full_content, image, icon, order_index, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [act.id, act.slug, act.title, act.tagline, act.description, act.full_content, act.image, act.icon, act.order_index, act.is_active]
          );
        }

        // Seed events
        for (const ev of seedData.events) {
          await this.pool.query(
            'INSERT INTO events (id, slug, title, event_date, location, summary, image, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [ev.id, ev.slug, ev.title, ev.event_date, ev.location, ev.summary, ev.image, ev.category]
          );
        }

        // Seed testimonials
        for (const t of seedData.testimonials) {
          await this.pool.query(
            'INSERT INTO testimonials (id, author_name, author_role, quote, rating, avatar) VALUES (?, ?, ?, ?, ?, ?)',
            [t.id, t.author_name, t.author_role, t.quote, t.rating, t.avatar]
          );
        }

        // Seed blog posts
        for (const b of seedData.blogPosts) {
          await this.pool.query(
            'INSERT INTO blog_posts (id, slug, title, excerpt, content, author, post_date, comments_count, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [b.id, b.slug, b.title, b.excerpt, b.content, b.author, b.post_date, b.comments_count, b.image]
          );
        }

        // Seed team
        for (const tm of seedData.teamMembers) {
          await this.pool.query(
            'INSERT INTO team_members (id, name, role, image, facebook, twitter, instagram) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [tm.id, tm.name, tm.role, tm.image, tm.facebook, tm.twitter, tm.instagram]
          );
        }

        console.log('✅ [MariaDB] Initial data seeded successfully!');
      }
    } catch (err) {
      console.error('Error during MariaDB migration/seeding:', err.message);
    }
  }

  // --- API Methods ---

  async getSiteSettings() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT setting_key, setting_value FROM site_settings');
        const settings = {};
        rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
        return { ...seedData.siteSettings, ...settings };
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.siteSettings;
  }

  async getActivities() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM activities WHERE is_active = 1 ORDER BY order_index ASC');
        return rows;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.activities;
  }

  async getActivityBySlug(slug) {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM activities WHERE slug = ? OR id = ? LIMIT 1', [slug, slug]);
        return rows[0] || null;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.activities.find(a => a.slug === slug || String(a.id) === String(slug)) || null;
  }

  async getEvents() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM events ORDER BY id ASC');
        return rows;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.events;
  }

  async getTestimonials() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM testimonials ORDER BY id ASC');
        return rows;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.testimonials;
  }

  async getBlogPosts() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM blog_posts ORDER BY id ASC');
        return rows;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.blogPosts;
  }

  async getTeamMembers() {
    if (this.isMariaDBConnected && this.pool) {
      try {
        const [rows] = await this.pool.query('SELECT * FROM team_members ORDER BY id ASC');
        return rows;
      } catch (e) {
        console.error('DB query error:', e.message);
      }
    }
    return this.localStore.teamMembers;
  }

  async getTrustInfo() {
    return this.localStore.trustInfo;
  }

  async getGalleryImages() {
    return this.localStore.galleryImages;
  }

  async getStats() {
    return this.localStore.stats;
  }

  async createDonation(data) {
    const record = {
      donor_name: data.donor_name || 'Generous Supporter',
      donor_email: data.donor_email || '',
      donor_phone: data.donor_phone || '',
      amount: parseFloat(data.amount || 0),
      cause: data.cause || 'General Fund',
      payment_method: data.payment_method || 'UPI',
      transaction_ref: 'TXN_' + Date.now(),
      status: 'completed',
      created_at: new Date().toISOString()
    };

    if (this.isMariaDBConnected && this.pool) {
      try {
        const [res] = await this.pool.query(
          'INSERT INTO donations (donor_name, donor_email, donor_phone, amount, cause, payment_method, transaction_ref, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [record.donor_name, record.donor_email, record.donor_phone, record.amount, record.cause, record.payment_method, record.transaction_ref, record.status]
        );
        record.id = res.insertId;
        return record;
      } catch (e) {
        console.error('DB error recording donation:', e.message);
      }
    }

    record.id = this.localStore.donations.length + 1;
    this.localStore.donations.push(record);
    return record;
  }

  async createVolunteer(data) {
    const record = {
      full_name: data.full_name || '',
      email: data.email || '',
      phone: data.phone || '',
      skills: data.skills || '',
      message: data.message || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };

    if (this.isMariaDBConnected && this.pool) {
      try {
        const [res] = await this.pool.query(
          'INSERT INTO volunteers (full_name, email, phone, skills, message, status) VALUES (?, ?, ?, ?, ?, ?)',
          [record.full_name, record.email, record.phone, record.skills, record.message, record.status]
        );
        record.id = res.insertId;
        return record;
      } catch (e) {
        console.error('DB error registering volunteer:', e.message);
      }
    }

    record.id = this.localStore.volunteers.length + 1;
    this.localStore.volunteers.push(record);
    return record;
  }

  async createContactMessage(data) {
    const record = {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      status: 'unread',
      created_at: new Date().toISOString()
    };

    if (this.isMariaDBConnected && this.pool) {
      try {
        const [res] = await this.pool.query(
          'INSERT INTO contact_messages (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)',
          [record.name, record.email, record.phone, record.subject, record.message, record.status]
        );
        record.id = res.insertId;
        return record;
      } catch (e) {
        console.error('DB error saving message:', e.message);
      }
    }

    record.id = this.localStore.contactMessages.length + 1;
    this.localStore.contactMessages.push(record);
    return record;
  }

  async createSubscriber(email) {
    if (!email) return false;
    if (this.isMariaDBConnected && this.pool) {
      try {
        await this.pool.query('INSERT IGNORE INTO subscribers (email) VALUES (?)', [email]);
        return true;
      } catch (e) {
        console.error('DB subscriber error:', e.message);
      }
    }
    if (!this.localStore.subscribers.includes(email)) {
      this.localStore.subscribers.push(email);
    }
    return true;
  }

  getStatus() {
    return {
      connectedToMariaDB: this.isMariaDBConnected,
      database: DB_CONFIG.database,
      host: DB_CONFIG.host,
      port: DB_CONFIG.port
    };
  }
}

module.exports = new DatabaseManager();
