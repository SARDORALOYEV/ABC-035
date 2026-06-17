const express = require('express');
const router = express.Router();
const {
  getCars, getFeaturedCars, getCarById,
  createCar, updateCar, deleteCar, deleteCarImage, getMonthlyStats, getCarStats,
} = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { carRules, validate } = require('../middleware/validators/carValidators');

// /featured route'si /:id dan oldin bo'lishi kerak
router.get('/monthly-stats', getMonthlyStats);
router.get('/stats', getCarStats);
router.get('/featured', getFeaturedCars);
router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, admin, upload.array('images', 10), carRules, validate, createCar);
router.put('/:id', protect, admin, upload.array('images', 10), updateCar);
router.delete('/:id', protect, admin, deleteCar);
router.delete('/:id/images/:imageId', protect, admin, deleteCarImage);

module.exports = router;
