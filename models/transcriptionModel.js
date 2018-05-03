const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcriptionSchema = new Schema({
    transcription: String,
});

const Transcription = module.exports = mongoose.model('Transcription', transcriptionSchema);