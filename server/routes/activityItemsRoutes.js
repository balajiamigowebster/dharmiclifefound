const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const activityItemsController = require('../controllers/activityItemsController');

// Multer middleware handling both 'imageFiles' and 'videoFiles' simultaneously
const activityMediaUpload = upload.fields([
  { name: 'imageFiles', maxCount: 20 },
  { name: 'videoFiles', maxCount: 5 }
]);

// Get items by subcategory slug (e.g. /api/activity-items/category/annadhanam)
router.get('/category/:slug', activityItemsController.getItemsByCategory);

// Get all items
router.get('/', activityItemsController.getItemsByCategory);

// Create item with optional images and videos uploaded securely via middleware
router.post('/', activityMediaUpload, activityItemsController.createItem);

// Update item with optional images/videos (supports PUT and POST for LiteSpeed compatibility)
router.put('/:id', activityMediaUpload, activityItemsController.updateItem);
router.post('/update/:id', activityMediaUpload, activityItemsController.updateItem);
router.post('/:id', activityMediaUpload, activityItemsController.updateItem);

// Delete item (supports DELETE and POST for LiteSpeed compatibility)
router.delete('/:id', activityItemsController.deleteItem);
router.post('/delete/:id', activityItemsController.deleteItem);

// Bulk sync items from frontend to DB
router.post('/sync', activityItemsController.bulkSyncCategory);

module.exports = router;
