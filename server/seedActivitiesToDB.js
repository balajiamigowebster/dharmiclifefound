require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize, ActivityItem } = require('./models');

// Import data files from client/src/data
const clientDataDir = path.join(__dirname, '..', 'client', 'src', 'data');

function loadModule(fileName) {
  const filePath = path.join(clientDataDir, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  // Strip export statements to evaluate cleanly
  const transformed = content
    .replace(/export const (\w+) =/g, 'const $1 =')
    .replace(/export default \w+;/g, '');
  
  const sandbox = {};
  const fn = new Function('sandbox', `${transformed}; return { ...sandbox, ...(typeof annadhanamDrives !== 'undefined' ? { annadhanamDrives } : {}), ...(typeof unclaimedSoulsDrives !== 'undefined' ? { unclaimedSoulsDrives } : {}), ...(typeof dharmicLifeClasses !== 'undefined' ? { dharmicLifeClasses } : {}), ...(typeof educationSupportDrives !== 'undefined' ? { educationSupportDrives } : {}), ...(typeof womenEmpowermentDrives !== 'undefined' ? { womenEmpowermentDrives } : {}), ...(typeof homelessDrives !== 'undefined' ? { homelessDrives } : {}), ...(typeof otherActivitiesDrives !== 'undefined' ? { otherActivitiesDrives } : {}) };`);
  return fn(sandbox);
}

async function seedFrontendActivities() {
  console.log('--- Seeding Frontend Activities to Database (dharmic-db) ---');
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const categories = [
    { slug: 'annadhanam', file: 'annadhanamDrives.js', key: 'annadhanamDrives' },
    { slug: 'unclaimed-souls', file: 'unclaimedSoulsDrives.js', key: 'unclaimedSoulsDrives' },
    { slug: 'spreading-the-dharmic-way-of-life', file: 'dharmicLifeClasses.js', key: 'dharmicLifeClasses' },
    { slug: 'education-support', file: 'educationSupportDrives.js', key: 'educationSupportDrives' },
    { slug: 'women-empowerment', file: 'womenEmpowermentDrives.js', key: 'womenEmpowermentDrives' },
    { slug: 'caring-for-homeless-people', file: 'homelessDrives.js', key: 'homelessDrives' },
    { slug: 'other-additional-activities', file: 'otherActivitiesDrives.js', key: 'otherActivitiesDrives' }
  ];

  let totalSeeded = 0;

  for (const cat of categories) {
    console.log(`Processing ${cat.slug}...`);
    const data = loadModule(cat.file);
    const items = data[cat.key] || [];

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const title = it.title || it.tagline || `Drive #${it.id}`;
      const content = it.content || it.summary || (it.location ? `Location: ${it.location}` : null);
      const images = it.images || [];
      const videos = it.videos || [];

      // Check if already in DB
      const existing = await ActivityItem.findOne({
        where: {
          categorySlug: cat.slug,
          title: title
        }
      });

      if (!existing) {
        await ActivityItem.create({
          categorySlug: cat.slug,
          title,
          content,
          images,
          videos,
          orderIndex: it.id || i + 1
        });
        totalSeeded++;
      }
    }
    console.log(`✓ Processed ${items.length} items for ${cat.slug}`);
  }

  console.log(`\n🎉 Completed! Total new activity items seeded to DB: ${totalSeeded}`);
  process.exit(0);
}

seedFrontendActivities().catch((err) => {
  console.error('Error seeding frontend activities:', err);
  process.exit(1);
});
