const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get items for a specific user and mood
router.get('/', itemController.getItems);

// Add a new item
router.post('/', itemController.addItem);

module.exports = router;
