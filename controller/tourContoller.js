const Tour = require('../models/tour');

// Create a new tour
exports.createTour = async (req, res) => {
  try {
    const { ItineraryId, description } = req.body;
    const tour = new Tour({
      ItineraryId,
      description,
    });
    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate('ItineraryId');
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific tour by ID
exports.getTourByItineraryId = async (req, res) => {
    try {
      const tour = await Tour.findOne({ ItineraryId: req.params.ItineraryId }).populate('ItineraryId');
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a tour by ItineraryId
  exports.updateTourByItineraryId = async (req, res) => {
    try {
      const updatedTour = await Tour.findOneAndUpdate(
        { ItineraryId: req.params.ItineraryId },
        req.body,
        { new: true }
      ).populate('ItineraryId');
      if (!updatedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json(updatedTour);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a tour by ItineraryId
  exports.deleteTourByItineraryId = async (req, res) => {
    try {
      const deletedTour = await Tour.findOneAndDelete({ ItineraryId: req.params.ItineraryId }).populate('ItineraryId');
      if (!deletedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      res.json(deletedTour);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
