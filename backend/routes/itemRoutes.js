import express from "express";
import {
  addItem,
  getItemsByMood,
  markCompleted,
  getCompletedItems,
  getAllItems
} from "../controllers/itemController.js";

const router = express.Router();

// POST - add new item
router.post("/", addItem);

// GET - get all items (active)
router.get("/", getAllItems);

// GET - get items by mood
router.get("/:userId/:mood", getItemsByMood);

// GET - get completed items
router.get("/completed", getCompletedItems);

// PUT - mark item as completed
router.put("/:id/complete", markCompleted);

export default router;
