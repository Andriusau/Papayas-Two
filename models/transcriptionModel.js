const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcriptionSchema = new Schema({
	transcriptionId: {
		type: String,
		default: ''
	},
	transcription: {
		type: String,
		default: ''
	},
	crutchWords: [{
		/* Store All the Crutch Words Found in Transcription Here */
		type: Schema.Types.ObjectId,
		ref: 'CrutchWords',
		default: ''
	}]
});

const Transcription = module.exports = mongoose.model('Transcription', transcriptionSchema);