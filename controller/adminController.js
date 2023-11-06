const Tour = require('../models/tour');

// Admin can update a tour by ID
exports.updateTour = async (req, res) => {
  try {
    const { ItineraryId, description } = req.body;
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { ItineraryId, description },
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

// Admin can delete a tour by ID
exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id).populate('ItineraryId');
    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(deletedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
