import Item from "../models/itemModel.js";

// Add a new item (movie/book)
export const addItem = async (req, res) => {
  try {
    const { userId, type, title, description, moodTags } = req.body;
    const item = new Item({ userId, type, title, description, moodTags });
    await item.save();
    res.json({ success: true, message: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get items for a specific mood
export const getItemsByMood = async (req, res) => {
  try {
    const { userId, mood } = req.params;
    const items = await Item.find({ userId, moodTags: mood });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Item.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompletedItems = async (req, res) => {
  try {
    const items = await Item.find({ completed: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ completed: false });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
