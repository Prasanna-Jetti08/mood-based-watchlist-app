import Item from '../models/itemModel.js';

// Get items for a specific user and mood
const getItems = async (req, res) => {
  const { userId, mood } = req.query;

  try {
    const items = await Item.find({ userId, mood });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

// Add a new item
const addItem = async (req, res) => {
  const { userId, mood, title, type, link } = req.body;

  if (!userId || !mood || !title || !type || !link) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = new Item({ userId, mood, title, type, link });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
};

export default { getItems, addItem };
