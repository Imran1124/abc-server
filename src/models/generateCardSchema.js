const mongoose = require('mongoose');

const generateCard = new mongoose.Schema({
    mobileno: {
        type: String,
    },
    file: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('doc_generated_card', generateCard)