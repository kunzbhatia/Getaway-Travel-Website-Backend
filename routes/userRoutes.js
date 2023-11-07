const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

router.get('/list', authenticateMiddleware, userController.getCurrentUser);


router.get('/all', userController.getAllUsers);

module.exports = router;


// Protected Route (Example)
// router.get('/protected', authenticateUser, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully.' });
// });



module.exports = router;
