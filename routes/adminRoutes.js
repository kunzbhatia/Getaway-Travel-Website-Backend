const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Admin can update a tour by ID
router.put('/tours/:userId', adminController.updateTour);

// Admin can delete a tour by ID
router.delete('/tours/:userId', adminController.deleteTour);

module.exports = router;
