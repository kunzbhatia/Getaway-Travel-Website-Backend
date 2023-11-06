const Booking = require('../models/booking');

// Create a booking with only itineraryId
exports.createBooking = async (req, res) => {
  try {
    const { userId, ItineraryId, /* other booking properties */ } = req.body;
    const booking = new Booking({
      userId,
      ItineraryId,
      // other booking properties
    });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const booking = await Booking.findOne({ userId: userId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedBooking = await Booking.findOneAndUpdate(
      { userId: userId },
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedBooking = await Booking.findOneAndDelete({ userId: userId });
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(deletedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
