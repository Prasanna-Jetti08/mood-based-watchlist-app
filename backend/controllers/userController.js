import User from "../models/userModel.js";

// ✅ Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Simple validation
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new User({ username, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all users (for testing)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
