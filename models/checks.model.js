const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checksSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    reqUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    history: {
        type: Array,
    },
    channelSend: {
        type: String,
        required: true
    },
    lastState: {
        type: Boolean,
        required: true,
        default: true
    }

})

const Checks = mongoose.model('Checks', checksSchema);
module.exports = Checks;