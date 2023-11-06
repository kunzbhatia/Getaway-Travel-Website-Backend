const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateUser = require('../middleware/authMiddleware');

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

// Protected Route (Example)
router.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Protected route accessed successfully.' });
});

module.exports = router;
