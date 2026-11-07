const path = require('path');
const fs = require('fs');
const { TestimonialVideo, Media } = require('../models');

// Ensure table exists in MySQL automatically
let tableChecked = false;
async function ensureTestimonialTable() {
  if (tableChecked) return;
  try {
    await TestimonialVideo.sync();
    tableChecked = true;
  } catch (err) {
    console.warn('[TestimonialVideo] Auto-sync check warning:', err.message);
  }
}

// Helper to record video media in DB
async function recordUploadedVideo(file, title, category) {
  const isVideo = file.mimetype.startsWith('video/');
  const mediaType = isVideo ? 'video' : 'image';
  const subFolder = isVideo ? 'videos' : 'images';
  const relativeUrl = `/uploads/${subFolder}/${file.filename}`;

  return await Media.create({
    originalName: file.originalname,
    fileName: file.filename,
    mediaType,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    url: relativeUrl,
    title: title || `${category} video`
  });
}

// 0. Manual or programmatic sync endpoint
exports.syncTable = async (req, res) => {
  try {
    await TestimonialVideo.sync({ alter: true });
    tableChecked = true;
    res.json({
      success: true,
      message: 'Table testimonial_videos synchronized successfully in MySQL database'
    });
  } catch (error) {
    console.error('Error synchronizing testimonial_videos table:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 1. Get all testimonial videos (optionally filtered by category)
exports.getTestimonialVideos = async (req, res) => {
  try {
    await ensureTestimonialTable();
    const category = req.params.category || req.query.category;
    const where = {};
    if (category) {
      where.category = category;
    }

    const videos = await TestimonialVideo.findAll({
      where,
      order: [
        ['orderIndex', 'ASC'],
        ['createdAt', 'ASC'],
        ['id', 'ASC']
      ]
    });

    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    console.error('Error in getTestimonialVideos:', error);
    // If table doesn't exist yet, attempt sync once and return empty array gracefully
    if (error.original && (error.original.code === 'ER_NO_SUCH_TABLE' || error.message.includes("doesn't exist"))) {
      try {
        await TestimonialVideo.sync();
        tableChecked = true;
        return res.json({ success: true, count: 0, data: [] });
      } catch (syncErr) {
        console.error('Sync attempt failed:', syncErr.message);
      }
      return res.json({ success: true, count: 0, data: [] });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get single testimonial video by ID
exports.getTestimonialVideoById = async (req, res) => {
  try {
    await ensureTestimonialTable();
    const { id } = req.params;
    const video = await TestimonialVideo.findByPk(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Testimonial video not found' });
    }
    res.json({ success: true, data: video });
  } catch (error) {
    console.error('Error in getTestimonialVideoById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Create a new testimonial video
exports.createTestimonialVideo = async (req, res) => {
  try {
    await ensureTestimonialTable();
    const {
      category,
      categoryName,
      title,
      name,
      speakerName,
      location,
      description,
      duration,
      orderIndex,
      videoUrl: passedVideoUrl
    } = req.body;

    const personName = (name || speakerName || title || '').trim();
    const personLocation = (location || '').trim();

    if (!category || !personName) {
      return res.status(400).json({
        success: false,
        message: 'Category and Student/Person Name are required.'
      });
    }

    const resolvedTitle = (title || personName || 'Student Testimonial').trim();

    let resolvedVideoUrl = passedVideoUrl || '';
    let resolvedThumbnailUrl = '';

    // Handle uploaded video file
    const videoFile = (req.files && req.files.videoFile && req.files.videoFile[0]) || req.file;
    if (videoFile) {
      const media = await recordUploadedVideo(videoFile, resolvedTitle, category);
      resolvedVideoUrl = media.url;
    }

    // Handle uploaded thumbnail image if present
    const thumbnailFile = req.files && req.files.thumbnailFile && req.files.thumbnailFile[0];
    if (thumbnailFile) {
      const media = await recordUploadedVideo(thumbnailFile, `${resolvedTitle} thumbnail`, category);
      resolvedThumbnailUrl = media.url;
    }

    if (!resolvedVideoUrl) {
      return res.status(400).json({
        success: false,
        message: 'A video file must be uploaded or a video link must be provided.'
      });
    }

    // Format human-friendly category display name
    let cleanCategoryName = categoryName;
    if (!cleanCategoryName) {
      cleanCategoryName = category === 'manoviyal-dharmam-classes'
        ? 'Manoviyal Dharmam Classes'
        : 'Udaliyal Dharmam Classes';
    }

    const newVideo = await TestimonialVideo.create({
      category: category.trim(),
      categoryName: cleanCategoryName.trim(),
      title: resolvedTitle,
      name: personName || null,
      speakerName: personName || null,
      location: personLocation || null,
      videoUrl: resolvedVideoUrl.trim(),
      thumbnailUrl: resolvedThumbnailUrl ? resolvedThumbnailUrl.trim() : (req.body.thumbnailUrl || null),
      description: description ? description.trim() : null,
      duration: duration ? duration.trim() : null,
      orderIndex: orderIndex !== undefined && orderIndex !== '' ? parseInt(orderIndex, 10) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial video saved and recorded to MySQL successfully',
      data: newVideo
    });
  } catch (error) {
    console.error('Error in createTestimonialVideo:', error);
    // If table doesn't exist, try to sync and retry once
    if (error.original && (error.original.code === 'ER_NO_SUCH_TABLE' || error.message.includes("doesn't exist"))) {
      try {
        await TestimonialVideo.sync();
        tableChecked = true;
        const retryPersonName = (req.body.name || req.body.speakerName || req.body.title || '').trim();
        const retryVideo = await TestimonialVideo.create({
          category: req.body.category.trim(),
          categoryName: req.body.categoryName || 'Udaliyal Dharmam Classes',
          title: retryPersonName,
          name: retryPersonName || null,
          speakerName: retryPersonName || null,
          location: req.body.location || null,
          videoUrl: req.body.videoUrl || '',
          description: req.body.description || null,
          duration: req.body.duration || null,
          orderIndex: 0
        });
        return res.status(201).json({
          success: true,
          message: 'Table created and video testimonial recorded successfully',
          data: retryVideo
        });
      } catch (retryErr) {
        console.error('Retry after sync failed:', retryErr.message);
      }
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update an existing testimonial video
exports.updateTestimonialVideo = async (req, res) => {
  try {
    await ensureTestimonialTable();
    const { id } = req.params;
    const item = await TestimonialVideo.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial video not found' });
    }

    const {
      category,
      categoryName,
      title,
      name,
      speakerName,
      location,
      description,
      duration,
      orderIndex,
      videoUrl
    } = req.body;

    // Check if new video file is uploaded
    const videoFile = (req.files && req.files.videoFile && req.files.videoFile[0]) || req.file;
    if (videoFile) {
      // Remove previous local video file if different
      if (item.videoUrl && item.videoUrl.startsWith('/uploads/videos/')) {
        const oldPath = path.join(__dirname, '..', item.videoUrl.replace(/^\//, ''));
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch (e) { /* ignore */ }
        }
      }
      const media = await recordUploadedVideo(videoFile, title || item.title, category || item.category);
      item.videoUrl = media.url;
    } else if (videoUrl) {
      item.videoUrl = videoUrl.trim();
    }

    // Check if new thumbnail is uploaded
    const thumbnailFile = req.files && req.files.thumbnailFile && req.files.thumbnailFile[0];
    if (thumbnailFile) {
      const media = await recordUploadedVideo(thumbnailFile, `${title || item.title} thumbnail`, category || item.category);
      item.thumbnailUrl = media.url;
    } else if (req.body.thumbnailUrl !== undefined) {
      item.thumbnailUrl = req.body.thumbnailUrl;
    }

    if (category) item.category = category.trim();
    if (categoryName) item.categoryName = categoryName.trim();
    if (title) item.title = title.trim();
    
    const personName = name !== undefined ? name : speakerName;
    if (personName !== undefined) {
      item.name = personName ? personName.trim() : null;
      item.speakerName = personName ? personName.trim() : null;
      if (!title) item.title = personName ? personName.trim() : 'Student Testimonial';
    }
    if (location !== undefined) {
      item.location = location ? location.trim() : null;
    }
    if (description !== undefined) item.description = description ? description.trim() : null;
    if (duration !== undefined) item.duration = duration ? duration.trim() : null;
    if (orderIndex !== undefined && orderIndex !== '') item.orderIndex = parseInt(orderIndex, 10);

    await item.save();

    res.json({
      success: true,
      message: 'Testimonial video updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error in updateTestimonialVideo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete testimonial video
exports.deleteTestimonialVideo = async (req, res) => {
  try {
    await ensureTestimonialTable();
    const { id } = req.params;
    const item = await TestimonialVideo.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial video not found' });
    }

    // Delete local video file from disk if stored in /uploads/videos
    if (item.videoUrl && item.videoUrl.startsWith('/uploads/videos/')) {
      const filePath = path.join(__dirname, '..', item.videoUrl.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { console.warn('Could not remove file:', e.message); }
      }
    }

    await item.destroy();

    res.json({
      success: true,
      message: 'Testimonial video removed from database and disk successfully'
    });
  } catch (error) {
    console.error('Error in deleteTestimonialVideo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
