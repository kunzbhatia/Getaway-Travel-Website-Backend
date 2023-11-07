const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists. Please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please register first.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password. Please try again.' });
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller function to get user data by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

// Controller function to get current user data
exports.getCurrentUser = async (req, res) => {
  try {
    // Access user ID from the request object after authentication middleware
    const userId = req.user.id;

    // Call the getUserById function to get user data
    const user = await this.getUserById(userId);

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    // Handle errors, e.g., send an error response
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Send the list of users in the response
    res.json(users);
  } catch (error) {
    // Handle errors, e.g., send an error response
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};