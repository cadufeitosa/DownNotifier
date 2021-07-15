const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortnerSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortnedUrl: {
        type: String,
        required: true
    },
    tracking: {
        type: Array,
        default: []
    },
    createdDate: {
        type: String,
        required: true
    }
})

const Shortner = mongoose.model('Shortner', shortnerSchema);
module.exports = Shortner;