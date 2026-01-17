const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    soil: {
        type: String, // veryDry, slightlyDry, moist, veryWet
        required: true
    },
    plant: {
        type: String, // healthy, okay, poor
        required: true
    },
    weather: {
        type: String, // veryHot, warm, pleasant, cool
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Observation', ObservationSchema);
