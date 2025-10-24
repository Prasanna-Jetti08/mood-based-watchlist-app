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
  const { userId, mood, title, type, comments } = req.body;
  console.log('Received request body:', req.body);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  if (!mood) {
    return res.status(400).json({ message: 'Mood is required' });
  }
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (!type) {
    return res.status(400).json({ message: 'Type is required' });
  }

  try {
    const newItem = new Item({ 
      userId, 
      mood, 
      title, 
      type, 
      comments
    });
    console.log('Creating new item:', newItem);
    const savedItem = await newItem.save();
    console.log('Item saved successfully:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ 
      message: 'Error adding item', 
      error: error.message,
      details: error.errors 
    });
  }
};

export default { getItems, addItem };
