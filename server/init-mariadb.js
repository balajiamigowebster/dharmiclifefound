require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const seedData = require('./seedData');

async function main() {
  console.log('--- MariaDB Dharmic Life Database Initializer ---');
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'dharmic_life_db';

  console.log(`Connecting to ${user}@${host}:${port}...`);
  try {
    const conn = await mysql.createConnection({ host, port, user, password });
    console.log('Connected to server.');
    
    console.log(`Creating database \`${database}\`...`);
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await conn.changeUser({ database });
    
    console.log('Applying schema from schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    const statements = schemaSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.toLowerCase().startsWith('use') && !s.toLowerCase().startsWith('create database'));

    for (const stmt of statements) {
      await conn.query(stmt);
    }
    console.log('Tables created successfully.');

    console.log('Seeding initial data...');
    // Seed site settings
    for (const [k, v] of Object.entries(seedData.siteSettings)) {
      await conn.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [k, String(v), String(v)]
      );
    }

    // Seed activities
    for (const act of seedData.activities) {
      await conn.query(
        'REPLACE INTO activities (id, slug, title, tagline, description, full_content, image, icon, order_index, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [act.id, act.slug, act.title, act.tagline, act.description, act.full_content, act.image, act.icon, act.order_index, act.is_active]
      );
    }

    // Seed events
    for (const ev of seedData.events) {
      await conn.query(
        'REPLACE INTO events (id, slug, title, event_date, location, summary, image, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ev.id, ev.slug, ev.title, ev.event_date, ev.location, ev.summary, ev.image, ev.category]
      );
    }

    // Seed testimonials
    for (const t of seedData.testimonials) {
      await conn.query(
        'REPLACE INTO testimonials (id, author_name, author_role, quote, rating, avatar) VALUES (?, ?, ?, ?, ?, ?)',
        [t.id, t.author_name, t.author_role, t.quote, t.rating, t.avatar]
      );
    }

    // Seed blog posts
    for (const b of seedData.blogPosts) {
      await conn.query(
        'REPLACE INTO blog_posts (id, slug, title, excerpt, content, author, post_date, comments_count, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [b.id, b.slug, b.title, b.excerpt, b.content, b.author, b.post_date, b.comments_count, b.image]
      );
    }

    // Seed team
    for (const tm of seedData.teamMembers) {
      await conn.query(
        'REPLACE INTO team_members (id, name, role, image, facebook, twitter, instagram) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tm.id, tm.name, tm.role, tm.image, tm.facebook, tm.twitter, tm.instagram]
      );
    }

    console.log('✅ MariaDB initialization completed successfully!');
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ MariaDB initialization failed:', err.message);
    process.exit(1);
  }
}

main();
