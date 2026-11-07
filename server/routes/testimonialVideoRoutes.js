const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const controller = require('../controllers/testimonialVideoController');

const testimonialUpload = upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]);

// Manual or programmatic table sync endpoint
router.all('/sync-table', controller.syncTable);

// GET all or by category query (/api/testimonial-videos?category=...)
router.get('/', controller.getTestimonialVideos);

// GET by category parameter (/api/testimonial-videos/category/:category)
router.get('/category/:category', controller.getTestimonialVideos);

// GET single by ID (/api/testimonial-videos/:id)
router.get('/:id', controller.getTestimonialVideoById);

// POST create new video (/api/testimonial-videos)
router.post('/', testimonialUpload, controller.createTestimonialVideo);

// PUT update video (/api/testimonial-videos/:id)
router.put('/:id', testimonialUpload, controller.updateTestimonialVideo);

// DELETE video (/api/testimonial-videos/:id)
router.delete('/:id', controller.deleteTestimonialVideo);

module.exports = router;

