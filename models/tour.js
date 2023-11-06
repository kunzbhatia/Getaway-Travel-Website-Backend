const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    ItineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
