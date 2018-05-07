const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crutchWordsSchema = new Schema({
	words: [
		{
			type: String,
			default: ''
		}
	],
	count: [
		{
			type: Number,
			default: 0
		}
	],
	crutchWordsId: {
		type: String,
		default: ''
	},
	transcription: {
		type: String,
		default: ''
	}
});

const CrutchWords = module.exports = mongoose.model('CrutchWords', crutchWordsSchema);