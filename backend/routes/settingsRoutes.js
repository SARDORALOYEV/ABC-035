const express = require('express');
const router = express.Router();
const { getAllSettings, getSetting, saveSetting, deleteSetting } = require('../controllers/settingsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getAllSettings);
router.get('/:key', protect, admin, getSetting);
router.put('/:key', protect, admin, saveSetting);
router.delete('/:key', protect, admin, deleteSetting);

module.exports = router;
