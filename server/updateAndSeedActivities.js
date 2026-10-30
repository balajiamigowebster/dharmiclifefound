require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize, ActivityItem, Media } = require('./models');

const clientDataDir = path.join(__dirname, '..', 'client', 'src', 'data');
const uploadsDir = path.join(__dirname, 'uploads');
const mapFile = path.join(uploadsDir, 'media-url-map.json');

const categoryFiles = [
  { slug: 'annadhanam', file: 'annadhanamDrives.js', key: 'annadhanamDrives' },
  { slug: 'unclaimed-souls', file: 'unclaimedSoulsDrives.js', key: 'unclaimedSoulsDrives' },
  { slug: 'spreading-the-dharmic-way-of-life', file: 'dharmicLifeClasses.js', key: 'dharmicLifeClasses' },
  { slug: 'education-support', file: 'educationSupportDrives.js', key: 'educationSupportDrives' },
  { slug: 'women-empowerment', file: 'womenEmpowermentDrives.js', key: 'womenEmpowermentDrives' },
  { slug: 'caring-for-homeless-people', file: 'homelessDrives.js', key: 'homelessDrives' },
  { slug: 'other-additional-activities', file: 'otherActivitiesDrives.js', key: 'otherActivitiesDrives' }
];

async function updateAndSeed() {
  console.log('--- Loading Media URL Map ---');
  if (!fs.existsSync(mapFile)) {
    throw new Error(`Mapping file ${mapFile} not found!`);
  }
  const urlMap = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));

  // Helper function to map URLs
  function transformUrl(u) {
    if (!u || typeof u !== 'string') return u;
    const trimmed = u.trim();
    if (urlMap[trimmed]) {
      return urlMap[trimmed].newUrl;
    }
    return u;
  }

  // 1. Update the 7 client data files
  console.log('\n--- Step 1: Updating Client Data Files with https://amigowebster.in/dharmiclife/uploads/... ---');
  for (const cat of categoryFiles) {
    const filePath = path.join(clientDataDir, cat.file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace all matching URLs in file
    let replaceCount = 0;
    for (const [oldUrl, info] of Object.entries(urlMap)) {
      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(info.newUrl);
        replaceCount++;
      }
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${cat.file}: Replaced ${replaceCount} URLs.`);
  }

  // 2. Connect to Database & Sync/Seed ActivityItem Table
  console.log('\n--- Step 2: Updating/Seeding ActivityItem Table in dharmic-db ---');
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  let totalSeeded = 0;
  let totalUpdated = 0;
  const sqlStatements = [];

  // SQL header for cPanel import
  sqlStatements.push('-- Dharmic Life Foundation Activity Items Database Seed');
  sqlStatements.push('-- Target Table: activity_items');
  sqlStatements.push('-- Generated on: ' + new Date().toISOString());
  sqlStatements.push('');

  for (const cat of categoryFiles) {
    const filePath = path.join(clientDataDir, cat.file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const transformed = content
      .replace(/export const (\w+) =/g, 'const $1 =')
      .replace(/export default \w+;/g, '');
    
    const fn = new Function(`
      ${transformed}
      return { ${cat.key} };
    `);
    const data = fn();
    const items = data[cat.key] || [];

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const title = it.title || it.tagline || `Drive #${it.id || i + 1}`;
      const contentText = it.content || it.summary || (it.location ? `Location: ${it.location}` : null);
      const images = (it.images || []).map(transformUrl);
      const videos = (it.videos || []).map(transformUrl);
      const orderIndex = it.id || i + 1;

      // Check if existing in DB
      const existing = await ActivityItem.findOne({
        where: {
          categorySlug: cat.slug,
          title: title
        }
      });

      if (existing) {
        await existing.update({
          content: contentText,
          images: images,
          videos: videos,
          orderIndex: orderIndex
        });
        totalUpdated++;
      } else {
        await ActivityItem.create({
          categorySlug: cat.slug,
          title: title,
          content: contentText,
          images: images,
          videos: videos,
          orderIndex: orderIndex
        });
        totalSeeded++;
      }

      // Generate SQL INSERT / ON DUPLICATE KEY UPDATE statement for cPanel MySQL import
      const escapeSql = (str) => {
        if (str === null || str === undefined) return 'NULL';
        return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
      };

      const jsonImages = escapeSql(JSON.stringify(images));
      const jsonVideos = escapeSql(JSON.stringify(videos));
      const escSlug = escapeSql(cat.slug);
      const escTitle = escapeSql(title);
      const escContent = escapeSql(contentText);

      sqlStatements.push(
        `INSERT INTO \`activity_items\` (\`categorySlug\`, \`title\`, \`content\`, \`images\`, \`videos\`, \`orderIndex\`, \`createdAt\`, \`updatedAt\`) ` +
        `VALUES (${escSlug}, ${escTitle}, ${escContent}, ${jsonImages}, ${jsonVideos}, ${orderIndex}, NOW(), NOW()) ` +
        `ON DUPLICATE KEY UPDATE \`content\`=${escContent}, \`images\`=${jsonImages}, \`videos\`=${jsonVideos}, \`orderIndex\`=${orderIndex}, \`updatedAt\`=NOW();`
      );
    }

    console.log(`✓ Processed ${items.length} items for ${cat.slug}`);
  }

  // 3. Register media in Media table for media gallery management
  console.log('\n--- Step 3: Registering Media records in DB ---');
  let mediaCount = 0;
  for (const [origUrl, info] of Object.entries(urlMap)) {
    const isVideo = info.type === 'video';
    const subFolder = isVideo ? 'videos' : 'images';
    const relativeUrl = `/uploads/${subFolder}/${info.fileName}`;

    let fileSize = 0;
    if (fs.existsSync(info.localPath)) {
      fileSize = fs.statSync(info.localPath).size;
    }

    const [rec, created] = await Media.findOrCreate({
      where: { fileName: info.fileName },
      defaults: {
        originalName: info.fileName,
        fileName: info.fileName,
        mediaType: info.type,
        mimeType: isVideo ? 'video/mp4' : (info.fileName.endsWith('.webp') ? 'image/webp' : 'image/jpeg'),
        size: fileSize,
        path: info.localPath,
        url: relativeUrl,
        title: `${info.type === 'video' ? 'Video' : 'Photo'} - ${info.fileName}`
      }
    });

    if (created) mediaCount++;
  }
  console.log(`✓ Registered ${mediaCount} new records in Media table.`);

  // Write SQL file for cPanel phpMyAdmin
  const sqlFilePath = path.join(__dirname, 'data', 'cpanel_activity_items_seed.sql');
  fs.writeFileSync(sqlFilePath, sqlStatements.join('\n'), 'utf-8');
  console.log(`✓ Generated cPanel SQL seed file: ${sqlFilePath}`);

  console.log('\n=============================================');
  console.log('UPDATE & SEED COMPLETE');
  console.log('=============================================');
  console.log(`Total new items seeded: ${totalSeeded}`);
  console.log(`Total existing items updated: ${totalUpdated}`);
  console.log(`Total Activity Items in DB: ${totalSeeded + totalUpdated}`);
  console.log(`cPanel SQL Seed: server/data/cpanel_activity_items_seed.sql`);
  process.exit(0);
}

if (require.main === module) {
  updateAndSeed().catch((err) => {
    console.error('Error during update and seed:', err);
    process.exit(1);
  });
}

module.exports = { updateAndSeed };

