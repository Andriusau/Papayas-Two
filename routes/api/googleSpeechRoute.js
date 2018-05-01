require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const keys = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const User = require('../../models/userModel');
const AudioFile = require('../../models/audioFileModel');
const Busboy = require('busboy');
const speech = require('@google-cloud/speech');
// const client = new speech.SpeechClient();
const request = require("request");
const fs = require('fs');
// const buf = require('audio-lena/wav');
// const context = require('audio-context')();


// const crypto = require('crypto');
const base64 = require('base-64');
const utf8 = require('utf8');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
module.exports = (app) => {
	app.get('/api/account/users', (req, res, next) => {
		/* Get Token */
		/* ?token=test */
		const {
			query
		} = req;
		const {
			token
		} = query;

		/* Get User Who is Saving the Audio */
		User.findOne({
			_id: token
		}, null, (err, doc) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: You\'re Lost'
				});
			} else {
				return res.send({
					success: true,
					message: 'You\'re Found',
					firstName: doc.firstName,
					lastName: doc.lastName,
					email: doc.email,
					crutchWords: doc.crutchWords,
					countCrutchWords: doc.countCrutchWords,
					audioFile: doc.audioFile,
					transcription: doc.transcription
				});
			}
		});
	});

	/* Uploading and Transcribing Audio File */
	app.post('/api/account/upload', function (req, res, next) {
		const element1 = req.body.element1;
		console.log('element1');
		console.log(element1);
		const busboy = new Busboy({
			headers: req.headers
		});
		// The file upload has completed
		busboy.on('finish', function (fieldname, filename, encoding, mimetype) {
			console.log('Upload finished');
			console.log('File [' + fieldname + '] Finished');

			/* The File Uploaded */
			console.log('File Uploaded:');
			console.log(req.files);
			console.log('File Data');
			console.log(req.files.element2.data);
			console.log('File Name:');
			console.log(req.files.element2.name);

			/* Converts File to Base64 */
			let file = btoa(req.files.element2.data);
			console.log(file);

			// const Google = new Google(keys.google);

			const options = {
				method: 'POST',
				url: 'https://speech.googleapis.com/v1/speech:recognize',
				qs: {
					key: 'AIzaSyBmBNjnnHCRvNv8pdo_90qo5Fu-hjdIz8M'
				},
				headers: {
					'Cache-Control': 'no-cache',
					'Content-Type': 'application/json'
				},
				body: {
					audio: {
						content: file
					},
					config: {
        "encoding": "AMR",
        "sampleRateHertz": 8000,
        "languageCode": "en-US",
					}
				},
				json: true
			};
			request(options, function (err, response, body) {
				if (err) throw new Error(err);
				console.log(body);
			});
			});
			res.send({
				success: true,
				message: 'File Uploaded!'
			})
		req.pipe(busboy);

	});

	/* Save Google Transcription to User */

	// const speech = new Speech({
	// 					// _id: new mongoose.Types.ObjectId(),
	// 					audioName: req.body.name,
	// 					audioFile: file.body
	// 				});
	// 				if (!audioFile) {
	// 					return res.send({
	// 						success: false,
	// 						message: 'Error: Must Upload Audio File!'
	// 					});
	// 				}
	// 				/* Error Handling if Crutch Words Field is Blank */
	// 				if (!audioName) {
	// 					return res.send({
	// 						success: false,
	// 						message: 'Error: Must Include Your Crutch Words!'
	// 					});
	// 				}
	// 				speech
	// 					.save()
	// 					.then(result => {
	// 						console.log(result);
	// 					});


	/* Parse the Transcribed Words from Transcription */

	/* Find the Crutch Words in Transcription User Identified */

	/* Save the Count of How Many Times Transcribed Words appear in Transcription */

	/* Get the Transcription and Amount off Times Crutch Words are Said from DB */
}