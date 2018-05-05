const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crutchWordsSchema = new Schema({
	word: String,
	count: Number,
	crutchWordsId: String,
	default: 0
});

const CrutchWords = module.exports = mongoose.model('CrutchWords', crutchWordsSchema);