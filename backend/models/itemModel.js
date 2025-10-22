const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Movie', 'Book'], required: true },
  link: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
