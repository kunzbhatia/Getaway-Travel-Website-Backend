const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    ItineraryId: {
        type: String,
        ref: 'Tour',
        required: true
    },
    // Add more fields for booking details
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
