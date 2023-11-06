const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');

// Create a new tour
router.post('/tours', tourController.createTour);

// Get all tours
router.get('/tours', tourController.getTours);

// Get a specific tour by ID
router.get('/tours/:userId', tourController.getTourById);

// Update a tour by ID
router.put('/tours/:userId', tourController.updateTour);

// Delete a tour by ID
router.delete('/tours/:userId', tourController.deleteTour);

module.exports = router;
