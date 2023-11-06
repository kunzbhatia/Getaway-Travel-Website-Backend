const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

// Create a new booking
router.post('/bookings', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.getBookings);

// Get a specific booking by ID
router.get('/bookings/:userId', bookingController.getBookingById);

// Update a booking by ID
router.put('/bookings/:userId', bookingController.updateBooking);

// Delete a booking by ID
router.delete('/bookings/:userId', bookingController.deleteBooking);

module.exports = router;
