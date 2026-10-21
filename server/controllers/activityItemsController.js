const { ActivityItem, Media } = require('../models');

// Helper to record media file in DB
async function recordUploadedMedia(file, categorySlug, title) {
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
    title: title || `${categorySlug} upload`
  });
}

// Get all items for a specific activity subcategory (or all if slug not given)
exports.getItemsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const where = slug ? { categorySlug: slug } : {};
    const items = await ActivityItem.findAll({
      where,
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    // Ensure images and videos are cleanly parsed arrays
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
    console.error('Error fetching activity items:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new activity item with files and/or existing URLs
exports.createItem = async (req, res) => {
  try {
    const { categorySlug, title, content, existingImages, existingVideos } = req.body;

    if (!categorySlug || !title) {
      return res.status(400).json({ success: false, message: 'categorySlug and title are required' });
    }

    // Parse existing URLs if provided (to preserve old data)
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

    // Process new uploaded files through middleware
    const imageFiles = (req.files && req.files.imageFiles) || [];
    const videoFiles = (req.files && req.files.videoFiles) || [];

    for (const file of imageFiles) {
      const media = await recordUploadedMedia(file, categorySlug, title);
      imagesList.push(media.url);
    }

    for (const file of videoFiles) {
      const media = await recordUploadedMedia(file, categorySlug, title);
      videosList.push(media.url);
    }

    // Find highest orderIndex for this category so new upload is placed at the end
    const maxItem = await ActivityItem.findOne({
      where: { categorySlug },
      order: [['orderIndex', 'DESC'], ['id', 'DESC']]
    });
    const nextOrder = maxItem ? (maxItem.orderIndex || maxItem.id || 0) + 1 : 1;

    const newItem = await ActivityItem.create({
      categorySlug,
      title,
      content: content || null,
      images: imagesList,
      videos: videosList,
      orderIndex: nextOrder
    });

    res.status(201).json({
      success: true,
      message: 'Activity item created and linked successfully',
      data: newItem
    });
  } catch (error) {
    console.error('Error creating activity item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update existing activity item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ActivityItem.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Activity item not found' });
    }

    const { title, content, existingImages, existingVideos, categorySlug } = req.body;

    // Preserve existing images and videos or update them
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

    // Process any newly attached files
    const imageFiles = (req.files && req.files.imageFiles) || [];
    const videoFiles = (req.files && req.files.videoFiles) || [];

    for (const file of imageFiles) {
      const media = await recordUploadedMedia(file, item.categorySlug, title || item.title);
      imagesList.push(media.url);
    }

    for (const file of videoFiles) {
      const media = await recordUploadedMedia(file, item.categorySlug, title || item.title);
      videosList.push(media.url);
    }

    if (title) item.title = title;
    if (content !== undefined) item.content = content;
    if (categorySlug) item.categorySlug = categorySlug;
    item.images = imagesList;
    item.videos = videosList;

    await item.save();

    res.json({
      success: true,
      message: 'Activity item updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error updating activity item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete activity item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ActivityItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Activity item not found' });
    }
    await item.destroy();
    res.json({ success: true, message: 'Activity item deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk sync/seed initial items for a category from frontend to DB
exports.bulkSyncCategory = async (req, res) => {
  try {
    const { categorySlug, items } = req.body;
    if (!categorySlug || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'categorySlug and items array are required' });
    }

    let createdCount = 0;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const title = it.title || it.tagline || `Item #${it.id || i + 1}`;
      const content = it.content || it.summary || (it.location ? `Location: ${it.location}` : null);
      const images = it.images || [];
      const videos = it.videos || [];

      // Check if already in DB
      const existing = await ActivityItem.findOne({
        where: { categorySlug, title }
      });

      if (!existing) {
        await ActivityItem.create({
          categorySlug,
          title,
          content,
          images,
          videos,
          orderIndex: it.id || i + 1
        });
        createdCount++;
      }
    }

    const allItems = await ActivityItem.findAll({
      where: { categorySlug },
      order: [['orderIndex', 'ASC'], ['id', 'ASC']]
    });

    res.json({
      success: true,
      message: `Successfully synchronized ${createdCount} new item(s) to database.`,
      count: allItems.length,
      data: allItems
    });
  } catch (error) {
    console.error('Error in bulkSyncCategory:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
