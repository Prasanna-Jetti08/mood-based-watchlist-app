import connectDB from '../backend/config/db.js';
import Item from '../backend/models/itemModel.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to MongoDB
    await connectDB();

    if (req.method === 'POST') {
      const { userId, mood, title, type, link } = req.body;

      if (!userId || !mood || !title || !type) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newItem = new Item({
        userId,
        mood,
        title,
        type,
        link: link || 'https://google.com'
      });

      const savedItem = await newItem.save();
      return res.status(201).json(savedItem);
    }

    if (req.method === 'GET') {
      const { userId, mood } = req.query;
      const items = await Item.find({ userId, mood });
      return res.status(200).json(items);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}