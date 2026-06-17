const express = require('express');
const router = express.Router();
const { list, getById, create, update, remove } = require('../controllers/crudController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/:table', protect, admin, list);
router.get('/:table/:id', protect, admin, getById);
router.post('/:table', protect, admin, create);
router.put('/:table/:id', protect, admin, update);
router.delete('/:table/:id', protect, admin, remove);

module.exports = router;
