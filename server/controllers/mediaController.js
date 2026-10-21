const path = require('path');
const fs = require('fs');
const { Media } = require('../models');

// Upload single media file (image or video) and save record to DB
exports.uploadSingleMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const isVideo = file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';
    const subFolder = isVideo ? 'videos' : 'images';
    const relativeUrl = `/uploads/${subFolder}/${file.filename}`;

    const mediaRecord = await Media.create({
      originalName: file.originalname,
      fileName: file.filename,
      mediaType,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      url: relativeUrl,
      title: req.body.title || null,
      description: req.body.description || null
    });

    res.status(201).json({
      success: true,
      message: `${mediaType === 'image' ? 'Image' : 'Video'} uploaded and saved to DB successfully`,
      data: mediaRecord
    });
  } catch (error) {
    console.error('Error in uploadSingleMedia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload multiple media files (images or videos) and save records to DB
exports.uploadMultipleMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const createdRecords = [];

    for (const file of req.files) {
      const isVideo = file.mimetype.startsWith('video/');
      const mediaType = isVideo ? 'video' : 'image';
      const subFolder = isVideo ? 'videos' : 'images';
      const relativeUrl = `/uploads/${subFolder}/${file.filename}`;

      const mediaRecord = await Media.create({
        originalName: file.originalname,
        fileName: file.filename,
        mediaType,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        url: relativeUrl,
        title: req.body.title || null,
        description: req.body.description || null
      });

      createdRecords.push(mediaRecord);
    }

    res.status(201).json({
      success: true,
      message: `${createdRecords.length} file(s) uploaded and saved to DB successfully`,
      data: createdRecords
    });
  } catch (error) {
    console.error('Error in uploadMultipleMedia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all media (optionally filter by ?type=image or ?type=video)
exports.getAllMedia = async (req, res) => {
  try {
    const { type } = req.query;
    const where = {};
    if (type && (type === 'image' || type === 'video')) {
      where.mediaType = type;
    }

    const mediaList = await Media.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: mediaList.length,
      data: mediaList
    });
  } catch (error) {
    console.error('Error in getAllMedia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get media by ID
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }
    res.json({ success: true, data: media });
  } catch (error) {
    console.error('Error in getMediaById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete media (from DB and disk)
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Remove file from disk if it exists
    if (fs.existsSync(media.path)) {
      fs.unlinkSync(media.path);
    }

    await media.destroy();

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error in deleteMedia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
