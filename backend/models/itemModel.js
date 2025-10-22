import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["movie", "book"],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  moodTags: [String],
  dateAdded: {
    type: Date,
    default: Date.now
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
