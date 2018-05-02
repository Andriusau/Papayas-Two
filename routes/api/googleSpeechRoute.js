require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const User = require('../../models/userModel');
const AudioFile = require('../../models/audioFileModel');
const Busboy = require('busboy');
const speech = require('@google-cloud/speech');
const request = require("request");
const fs = require('fs');

module.exports = (app) => {


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
			console.log('File [' + req.files.element2.name + '] Finished');
			console.log('File Type [' + req.files.element2.mimetype + ']');
			console.log('File Encoding [' + req.files.element2.encoding + ']');

			/* The File Uploaded */
			console.log('File Uploaded:');
			console.log(req.files.element2);
			console.log('File Data');
			console.log(req.files.element2.data);
			console.log('File Name:');
			console.log(req.files.element2.name);

			/* Converts File to Base64 */
			let file = btoa(req.files.element2.data);
			console.log(file);
			// console.log(solution.file);
		});
			const options = {
				method: 'POST',
				url: 'https://speech.googleapis.com/v1/speech:recognize',
				qs: {
					key: key
				},
				headers: {
					'Cache-Control': 'no-cache',
					'Content-Type': 'application/json'
				},
				body: {
					audio: {
						content: btoa(req.files.element2.data)
					},
					config: {
						"languageCode": "en-US",
					}
				},
				json: true
			};
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				console.log(JSON.stringify(body.results));
			});
			res.send({
				success: true,
				message: 'File Uploaded!',
			})
		req.pipe(busboy);

	});

	/* Save Google Transcription to User */

	/* Parse the Transcribed Words from Transcription */

	/* Find the Crutch Words in Transcription User Identified */

	/* Save the Count of How Many Times Transcribed Words appear in Transcription */

	/* Get the Transcription and Amount off Times Crutch Words are Said from DB */
}