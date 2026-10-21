const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const awardItemsController = require('../controllers/awardItemsController');

const awardMediaUpload = upload.fields([
  { name: 'imageFiles', maxCount: 20 },
  { name: 'videoFiles', maxCount: 5 }
]);

// Get items by award type (e.g. /api/award-items/type/srowtha-rathana-award)
router.get('/type/:awardType', awardItemsController.getAwardsByType);

// Get all award items
router.get('/', awardItemsController.getAwardsByType);

// Create award item with upload files
router.post('/', awardMediaUpload, awardItemsController.createAwardItem);

// Update award item with upload files
router.put('/:id', awardMediaUpload, awardItemsController.updateAwardItem);

// Delete award item
router.delete('/:id', awardItemsController.deleteAwardItem);

// Bulk sync from frontend
router.post('/sync', awardItemsController.bulkSyncAwards);

module.exports = router;
