import express from "express";
import { registerUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// POST - Register a new user
router.post("/register", registerUser);

// GET - Get all users (for testing)
router.get("/", getUsers);

export default router;
