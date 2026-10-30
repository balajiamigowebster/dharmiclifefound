const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const clientDataDir = path.join(__dirname, '..', 'client', 'src', 'data');
const uploadsDir = path.join(__dirname, 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const videosDir = path.join(uploadsDir, 'videos');
const mapFile = path.join(uploadsDir, 'media-url-map.json');

// Ensure target directories exist
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(videosDir, { recursive: true });

const files = [
  'annadhanamDrives.js',
  'unclaimedSoulsDrives.js',
  'dharmicLifeClasses.js',
  'educationSupportDrives.js',
  'womenEmpowermentDrives.js',
  'homelessDrives.js',
  'otherActivitiesDrives.js'
];

function loadModule(fileName) {
  const filePath = path.join(clientDataDir, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  const transformed = content
    .replace(/export const (\w+) =/g, 'const $1 =')
    .replace(/export default \w+;/g, '');
  
  const fn = new Function(`
    ${transformed}
    return {
      ...(typeof annadhanamDrives !== 'undefined' ? { annadhanamDrives } : {}),
      ...(typeof unclaimedSoulsDrives !== 'undefined' ? { unclaimedSoulsDrives } : {}),
      ...(typeof dharmicLifeClasses !== 'undefined' ? { dharmicLifeClasses } : {}),
      ...(typeof educationSupportDrives !== 'undefined' ? { educationSupportDrives } : {}),
      ...(typeof womenEmpowermentDrives !== 'undefined' ? { womenEmpowermentDrives } : {}),
      ...(typeof homelessDrives !== 'undefined' ? { homelessDrives } : {}),
      ...(typeof otherActivitiesDrives !== 'undefined' ? { otherActivitiesDrives } : {})
    };
  `);
  return fn();
}

// Collect all unique images and videos
const allImages = new Set();
const allVideos = new Set();

for (const file of files) {
  const data = loadModule(file);
  const key = Object.keys(data)[0];
  const items = data[key] || [];

  for (const item of items) {
    if (item.images && Array.isArray(item.images)) {
      for (const img of item.images) {
        if (typeof img === 'string' && img.startsWith('http')) {
          allImages.add(img.trim());
        }
      }
    }
    if (item.videos && Array.isArray(item.videos)) {
      for (const vid of item.videos) {
        if (typeof vid === 'string' && vid.startsWith('http')) {
          allVideos.add(vid.trim());
        }
      }
    }
  }
}

// Build URL mapping with clash prevention
const BACKEND_BASE = 'https://amigowebster.in/dharmiclife';
const urlMap = {};
const usedImageNames = new Map();
const usedVideoNames = new Map();

for (const u of allImages) {
  const parsed = new URL(u);
  let baseName = path.basename(parsed.pathname);
  if (usedImageNames.has(baseName) && usedImageNames.get(baseName) !== u) {
    // Collision: extract parent folder (e.g., '2026-08') and prepend
    const parts = parsed.pathname.split('/').filter(Boolean);
    const parentFolder = parts.length > 1 ? parts[parts.length - 2] : 'sub';
    baseName = `${parentFolder}_${baseName}`;
  }
  usedImageNames.set(baseName, u);
  urlMap[u] = {
    type: 'image',
    fileName: baseName,
    localPath: path.join(imagesDir, baseName),
    newUrl: `${BACKEND_BASE}/uploads/images/${baseName}`
  };
}

for (const u of allVideos) {
  const parsed = new URL(u);
  let baseName = path.basename(parsed.pathname);
  if (usedVideoNames.has(baseName) && usedVideoNames.get(baseName) !== u) {
    const parts = parsed.pathname.split('/').filter(Boolean);
    const parentFolder = parts.length > 1 ? parts[parts.length - 2] : 'sub';
    baseName = `${parentFolder}_${baseName}`;
  }
  usedVideoNames.set(baseName, u);
  urlMap[u] = {
    type: 'video',
    fileName: baseName,
    localPath: path.join(videosDir, baseName),
    newUrl: `${BACKEND_BASE}/uploads/videos/${baseName}`
  };
}

// Save mapping file for reference
fs.writeFileSync(mapFile, JSON.stringify(urlMap, null, 2), 'utf-8');
console.log(`URL Map written to ${mapFile}`);
console.log(`Total Images to download: ${allImages.size}`);
console.log(`Total Videos to download: ${allVideos.size}`);

// Download single file with retries
function downloadFile(url, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    // If file already exists and has size > 0, skip
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 0) {
        return resolve({ skipped: true, size: stats.size });
      }
    }

    const tempPath = destPath + '.tmp';
    const client = url.startsWith('https') ? https : http;

    const attempt = (n) => {
      const fileStream = fs.createWriteStream(tempPath);
      const req = client.get(url, { timeout: 60000 }, (res) => {
        // Handle redirect
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fileStream.close();
          fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
          return downloadFile(res.headers.location, destPath, n - 1).then(resolve).catch(reject);
        }

        if (res.statusCode !== 200) {
          fileStream.close();
          fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
          if (n > 1) {
            return setTimeout(() => attempt(n - 1), 2000);
          }
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }

        res.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(() => {
            try {
              if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
              fs.renameSync(tempPath, destPath);
              const size = fs.statSync(destPath).size;
              resolve({ skipped: false, size });
            } catch (err) {
              reject(err);
            }
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        fileStream.close();
        fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
        if (n > 1) {
          console.log(`Timeout on ${path.basename(destPath)}, retrying (${n - 1} left)...`);
          return setTimeout(() => attempt(n - 1), 3000);
        }
        reject(new Error(`Timeout downloading ${url}`));
      });

      req.on('error', (err) => {
        fileStream.close();
        fs.existsSync(tempPath) && fs.unlinkSync(tempPath);
        if (n > 1) {
          console.log(`Error on ${path.basename(destPath)}: ${err.message}, retrying...`);
          return setTimeout(() => attempt(n - 1), 3000);
        }
        reject(err);
      });
    };

    attempt(retries);
  });
}

// Queue runner with controlled concurrency
async function runPool(items, concurrency, onProgress) {
  let index = 0;
  let completed = 0;
  const total = items.length;

  return new Promise((resolve) => {
    let active = 0;

    function next() {
      if (completed >= total) {
        return resolve();
      }

      while (active < concurrency && index < total) {
        const item = items[index++];
        active++;

        downloadFile(item.url, item.dest)
          .then((res) => {
            completed++;
            onProgress(completed, total, item, res, null);
          })
          .catch((err) => {
            completed++;
            onProgress(completed, total, item, null, err);
          })
          .finally(() => {
            active--;
            next();
          });
      }
    }

    next();
  });
}

async function main() {
  console.log('\n=============================================');
  console.log('STEP 1: Downloading All Activity Images (432)');
  console.log('=============================================');

  const imageItems = Array.from(allImages).map(u => ({
    url: u,
    dest: urlMap[u].localPath,
    name: urlMap[u].fileName
  }));

  let imgBytes = 0;
  let imgErrors = [];

  const t0Img = Date.now();
  await runPool(imageItems, 10, (done, total, item, res, err) => {
    if (err) {
      console.error(`[X] Image failed: ${item.name} (${err.message})`);
      imgErrors.push({ item, err: err.message });
    } else {
      if (!res.skipped) imgBytes += res.size;
      if (done % 50 === 0 || done === total) {
        const pct = ((done / total) * 100).toFixed(1);
        console.log(`Progress: ${done}/${total} (${pct}%) images processed. Total size: ${(imgBytes / (1024 * 1024)).toFixed(1)} MB`);
      }
    }
  });

  const imgSec = ((Date.now() - t0Img) / 1000).toFixed(1);
  console.log(`Images finished in ${imgSec}s! (Errors: ${imgErrors.length})`);

  console.log('\n=============================================');
  console.log('STEP 2: Downloading All Activity Videos (97)');
  console.log('=============================================');

  const videoItems = Array.from(allVideos).map(u => ({
    url: u,
    dest: urlMap[u].localPath,
    name: urlMap[u].fileName
  }));

  let vidBytes = 0;
  let vidErrors = [];

  const t0Vid = Date.now();
  await runPool(videoItems, 4, (done, total, item, res, err) => {
    if (err) {
      console.error(`[X] Video failed: ${item.name} (${err.message})`);
      vidErrors.push({ item, err: err.message });
    } else {
      if (!res.skipped) vidBytes += res.size;
      const sizeMb = (res.size / (1024 * 1024)).toFixed(1);
      const action = res.skipped ? 'skipped (cached)' : `${sizeMb} MB`;
      const pct = ((done / total) * 100).toFixed(1);
      console.log(`[${done}/${total} - ${pct}%] ${item.name} -> ${action}`);
    }
  });

  const vidSec = ((Date.now() - t0Vid) / 1000).toFixed(1);
  console.log(`\nVideos finished in ${vidSec}s! (Total downloaded: ${(vidBytes / (1024 * 1024)).toFixed(1)} MB, Errors: ${vidErrors.length})`);

  console.log('\n=============================================');
  console.log('SUMMARY');
  console.log('=============================================');
  console.log(`Images: ${imageItems.length - imgErrors.length}/${imageItems.length} downloaded successfully.`);
  console.log(`Videos: ${videoItems.length - vidErrors.length}/${videoItems.length} downloaded successfully.`);
  if (imgErrors.length > 0) console.log('Image errors:', imgErrors);
  if (vidErrors.length > 0) console.log('Video errors:', vidErrors);
}

main().catch(console.error);

