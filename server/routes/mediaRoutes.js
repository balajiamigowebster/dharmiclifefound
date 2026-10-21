const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const mediaController = require('../controllers/mediaController');

// Upload single image or video (field name: "file")
router.post('/upload', upload.single('file'), mediaController.uploadSingleMedia);

// Upload multiple images or videos (field name: "files", max: 20)
router.post('/upload-multiple', upload.array('files', 20), mediaController.uploadMultipleMedia);

// Get list of media (supports query ?type=image or ?type=video)
router.get('/', mediaController.getAllMedia);

// Get single media by ID
router.get('/:id', mediaController.getMediaById);

// Delete media by ID
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
