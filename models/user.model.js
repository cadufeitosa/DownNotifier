const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    blocklisted: {
        type: Boolean,
        required: true,
        default: false
    },
    premium: {
        type: Boolean,
        required: true,
        default: false
    },
    checkqty: {
        type: Number,
        required: true,
        default: 0
    },
    shortenedqty: {
        type: Number,
        required: true,
        default: 0
    },
    email: {
        type: String,
        default: ""
    },
    emailRegistered: {
        type: Boolean,
        required: true,
        default: false
    },
    addedDate: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);
module.exports = User;