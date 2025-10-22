import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Movie', 'Book'], required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;
