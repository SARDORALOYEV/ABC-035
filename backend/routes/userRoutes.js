const express = require('express');
const router = express.Router();
const { getUsers, getUserCount, getUserById, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/count', getUserCount);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
