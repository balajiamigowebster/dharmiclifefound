const { AwardItem, Media } = require('../models');

// Helper to record media file in DB
async function recordUploadedMedia(file, awardType, title) {
  const isVideo = file.mimetype.startsWith('video/');
  const mediaType = isVideo ? 'video' : 'image';
  const subFolder = isVideo ? 'videos' : 'images';
  const url = `/uploads/${subFolder}/${file.filename}`;

  return await Media.create({
    originalName: file.originalname,
    fileName: file.filename,
    mediaType,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    url,
    title: title || `${awardType} upload`
  });
}

// Get all awards by type (e.g. 'srowtha-rathana-award' or 'dharma-shri-award')
exports.getAwardsByType = async (req, res) => {
  try {
    const { awardType } = req.params;
    const where = awardType ? { awardType } : {};
    const items = await AwardItem.findAll({
      where,
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    const formatted = items.map((item) => {
      const obj = item.toJSON();
      if (typeof obj.images === 'string') {
        try { obj.images = JSON.parse(obj.images); } catch (e) { obj.images = []; }
      }
      if (!Array.isArray(obj.images)) obj.images = [];

      if (typeof obj.videos === 'string') {
        try { obj.videos = JSON.parse(obj.videos); } catch (e) { obj.videos = []; }
      }
      if (!Array.isArray(obj.videos)) obj.videos = [];

      return obj;
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('Error fetching award items:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new award item with files or existing URLs
exports.createAwardItem = async (req, res) => {
  try {
    const {
      awardType,
      year,
      title,
      awardName,
      subtitle,
      recipient,
      location,
      cashPrize,
      recognition,
      content,
      tributeText,
      existingImages,
      existingVideos
    } = req.body;

    if (!awardType || !title || !recipient) {
      return res.status(400).json({
        success: false,
        message: 'awardType, title, and recipient are required'
      });
    }

    let imagesList = [];
    if (existingImages) {
      try {
        imagesList = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      } catch (e) {
        imagesList = [existingImages];
      }
    }
    if (!Array.isArray(imagesList)) imagesList = [];

    let videosList = [];
    if (existingVideos) {
      try {
        videosList = typeof existingVideos === 'string' ? JSON.parse(existingVideos) : existingVideos;
      } catch (e) {
        videosList = [existingVideos];
      }
    }
    if (!Array.isArray(videosList)) videosList = [];

    // Process newly uploaded files
    const imageFiles = (req.files && req.files.imageFiles) || [];
    const videoFiles = (req.files && req.files.videoFiles) || [];

    for (const file of imageFiles) {
      const media = await recordUploadedMedia(file, awardType, title);
      imagesList.push(media.url);
    }

    for (const file of videoFiles) {
      const media = await recordUploadedMedia(file, awardType, title);
      videosList.push(media.url);
    }

    const maxItem = await AwardItem.findOne({
      where: { awardType },
      order: [['orderIndex', 'DESC'], ['id', 'DESC']]
    });
    const nextOrder = maxItem ? (maxItem.orderIndex || maxItem.id || 0) + 1 : 1;

    const newItem = await AwardItem.create({
      awardType,
      year: year || '',
      title,
      awardName: awardName || 'Srowtha Ratnam Award',
      subtitle: subtitle || 'Honouring Lifelong Dedication to Dharma and Vedic Traditions',
      recipient,
      location: location || '',
      cashPrize: cashPrize || '',
      recognition: recognition || 'Vedic Dharma',
      content: content || '',
      tributeText: tributeText || '',
      images: imagesList,
      videos: videosList,
      orderIndex: nextOrder
    });

    res.status(201).json({
      success: true,
      message: 'Award item created successfully',
      data: newItem
    });
  } catch (error) {
    console.error('Error creating award item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update existing award item
exports.updateAwardItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await AwardItem.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Award item not found' });
    }

    const {
      awardType,
      year,
      title,
      awardName,
      subtitle,
      recipient,
      location,
      cashPrize,
      recognition,
      content,
      tributeText,
      existingImages,
      existingVideos,
      orderIndex
    } = req.body;

    let imagesList = item.images || [];
    if (existingImages !== undefined) {
      try {
        imagesList = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      } catch (e) {
        imagesList = [existingImages];
      }
    }
    if (!Array.isArray(imagesList)) imagesList = [];

    let videosList = item.videos || [];
    if (existingVideos !== undefined) {
      try {
        videosList = typeof existingVideos === 'string' ? JSON.parse(existingVideos) : existingVideos;
      } catch (e) {
        videosList = [existingVideos];
      }
    }
    if (!Array.isArray(videosList)) videosList = [];

    const imageFiles = (req.files && req.files.imageFiles) || [];
    const videoFiles = (req.files && req.files.videoFiles) || [];

    for (const file of imageFiles) {
      const media = await recordUploadedMedia(file, item.awardType, title || item.title);
      imagesList.push(media.url);
    }

    for (const file of videoFiles) {
      const media = await recordUploadedMedia(file, item.awardType, title || item.title);
      videosList.push(media.url);
    }

    if (awardType) item.awardType = awardType;
    if (year !== undefined) item.year = year;
    if (title) item.title = title;
    if (awardName !== undefined) item.awardName = awardName;
    if (subtitle !== undefined) item.subtitle = subtitle;
    if (recipient) item.recipient = recipient;
    if (location !== undefined) item.location = location;
    if (cashPrize !== undefined) item.cashPrize = cashPrize;
    if (recognition !== undefined) item.recognition = recognition;
    if (content !== undefined) item.content = content;
    if (tributeText !== undefined) item.tributeText = tributeText;
    if (orderIndex !== undefined) item.orderIndex = parseInt(orderIndex, 10);
    item.images = imagesList;
    item.videos = videosList;

    await item.save();

    res.json({
      success: true,
      message: 'Award item updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error updating award item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete award item
exports.deleteAwardItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await AwardItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Award item not found' });
    }
    await item.destroy();
    res.json({ success: true, message: 'Award item deleted successfully' });
  } catch (error) {
    console.error('Error deleting award item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk sync/seed items for awards
exports.bulkSyncAwards = async (req, res) => {
  try {
    const { awardType, items } = req.body;
    if (!awardType || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'awardType and items array are required' });
    }

    let createdCount = 0;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const title = it.title || `${it.year} Award`;
      const recipient = it.recipient || 'Recipient';

      const existing = await AwardItem.findOne({
        where: { awardType, title }
      });

      if (!existing) {
        await AwardItem.create({
          awardType,
          year: it.year || '',
          title,
          awardName: it.awardName || 'Srowtha Ratnam Award',
          subtitle: it.subtitle || 'Honouring Lifelong Dedication to Dharma and Vedic Traditions',
          recipient,
          location: it.location || '',
          cashPrize: it.cashPrize || '',
          recognition: it.recognition || 'Vedic Dharma',
          content: it.content || '',
          tributeText: it.tributeText || '',
          images: it.images || [],
          videos: it.videos || [],
          orderIndex: it.orderIndex || i + 1
        });
        createdCount++;
      }
    }

    const allItems = await AwardItem.findAll({
      where: { awardType },
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    res.json({
      success: true,
      message: `Synchronized ${createdCount} awards into database.`,
      count: allItems.length,
      data: allItems
    });
  } catch (error) {
    console.error('Error in bulkSyncAwards:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
