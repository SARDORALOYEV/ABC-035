const express = require('express');
const router = express.Router();
const {
  createOrder, getOrders, getOrderById,
  updateOrderStatus, deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const { orderRules, statusRules, validate } = require('../middleware/validators/orderValidators');

router.post('/', orderRules, validate, createOrder);
router.get('/', protect, admin, getOrders);
router.get('/:id', protect, admin, getOrderById);
router.put('/:id', protect, admin, statusRules, validate, updateOrderStatus);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
