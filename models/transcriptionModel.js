const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcriptionSchema = new Schema({
	transcriptionId: String,
	transcription: String
});

const Transcription = module.exports = mongoose.model('Transcription', transcriptionSchema);