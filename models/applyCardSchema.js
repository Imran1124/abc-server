const mongoose = require('mongoose');

const applyCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 500
    },
    mobileno: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    fathername: {
        type: String,
        required: true
    },
    language: {
        type: Array,
        default: []
    },
    gender: {
        type: String,
        required: true
    },
    maritalstatus: {
        type: String,
        required: true
    },
    caddress: {
        type: Object,
        default: {}
    },
    paddress: {
        type: Object,
        default: {}
    },
    education: {
        type: Array,
        default: []
    },
    skill: {
        type: Array,
        default: []
    },
    experience: {
        type: String
    },
    fromdate: {
        type: Date
    },
    todate: {
        type: Date
    },
    position: {
        type: String
    },
    company: {
        type: String
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,

    }
});

module.exports = mongoose.model('doc_applycard', applyCardSchema);