import express from 'express';
import itemController from '../controllers/itemController.js';

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, {
    body: req.body,
    query: req.query
  });
  next();
});

// Get items for a specific user and mood
router.get('/', itemController.getItems);

// Add a new item
router.post('/', itemController.addItem);

export default router;
