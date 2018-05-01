const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioFileSchema = new Schema({
    title: String,
    body: String,
});

const AudioFile = module.exports = mongoose.model('AudioFile', audioFileSchema);