const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addDate = new Date().toLocaleDateString('pt-BR')

const guildSchema = new Schema({
    guild_id: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        default: "/"
    },
    addedDate: {
        type: String,
        default: ""
    },

})

const Guild = mongoose.model('Guild', guildSchema);
module.exports = Guild;