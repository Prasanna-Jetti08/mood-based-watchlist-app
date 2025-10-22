import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

export default router;
