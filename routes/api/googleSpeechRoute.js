require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const CrutchWords = require('../../models/crutchWordsModel');
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');
const Busboy = require('busboy');
const busboyPromise = require('busboy-promise');
const speech = require('@google-cloud/speech');
const request = require('request');
const fs = require('fs');



module.exports = (app) => {
	/* Uploading and Transcribing Audio File */
	app.post('/api/account/upload', async function (req, res, next) {
		/* Use Token in Query Params */
		const {
			body
		} = req.body;

		/* If Audio File is Uploaded Follow the Below */
		const busboy = new Busboy({
			headers: req.headers
		});
		const token = req.body.element1;
		console.log(token);
		const convertedFile = btoa(req.files.element2.data);

		/* The file upload has completed */
		busboy.on('finish', function () {
			/* Converts File to Base64 */
			const file = convertedFile;
			console.log('Upload finished... Starting Translation');
			/* Call googleTranslate Function */
			googleTranslate(file, token)
		})
		req.pipe(busboy)




		async function googleTranslate(file, token) {
			/* Set Up Request to Google Speech API */
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
						'languageCode': 'en-US',
					}
				},
				json: true
			};

			request(options, function (err, results, body) {
				if (err) throw new Error(err);
				/* The File Uploaded Object */
				const transcriptionArray = [];
				/* For Loops to Get Full Transcription by Itself */
				for (var i = 0; i < body.results.length; i++) {
					for (var j = 0; j < body.results[i].alternatives.length; j++) {
						transcriptionArray.push(JSON.stringify(body.results[i].alternatives[j].transcript));
					}
				}
				let transcription = {
					transcription: transcriptionArray.join("", "").replace(/"([^""]+(?="))"/g, '$1'),
					transcriptionId: token
				};

				/* Create a the Transcription in the Transcriptions Collection */
				Transcription.create(transcription);
				/* Save the Transcription to the User's Profile */
				const newTranscription = new Transcription({
					transcription: transcription,
					transcriptionId: transcription._id
				});
				newTranscription.save(function () {
					console.log('transcription saved');
					console.log('transcription: ' + transcription.transcription);
					console.log('transcriptionId: ' + transcription.transcriptionId);

					User.findOneAndUpdate({
							/* This has to be Equal to the User's Object ID */
							_id: transcription.transcriptionId
						}, {
							$push: {
								transcriptions: newTranscription
							}
						}, {
							new: true
						})
						.then(function (result, _id) {
							console.log(JSON.stringify(body.results));
							JSON.stringify(body.results);
							console.log('=============');
							console.log(newTranscription._id);
							console.log('=============');

							/* Call Crutch Words Promise Function Here */
							let finalT = transcription.transcription.toLowerCase();
							console.log(newTranscription._id);
							getCrutchWords(finalT, newTranscription._id);
							/* Make the Response from Our Request */
							Transcription.findOne({
									_id: newTranscription._id
								},
								function (err, doc) {
									if (err) {
										return res.send({
											success: false,
											message: 'Error: Server Error During Sign In'
										});
									}
									/* Get the Transcription and Amount of Times Crutch Words are Said from DB */
									return res.send({
										success: true,
										_id: newTranscription._id,
										transcription: transcription.transcription,
										transcriptionId: transcription.transcriptionId,
										crutchWords: transcription.crutchWords
									})
								})
						})
				});
			});
		} /* End Google Transcription Function */
	});
	/* Find the Crutch Words in Transcription User Identified */
	function getCrutchWords(transcript, _id) {
		console.log('Token Passed in Associated to UserSession, also Token and also transcriptionId:');
		console.log(_id);
		const crutchWords = [{
				"word": "just",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "almost",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "basically",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "actually",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "definitely",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "literally",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "really",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "very",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "truly",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "essentially",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "seriously",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "totally",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "honestly",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "obviously",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "so",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "anyway",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "well",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "right",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "okay",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "well",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "great",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "fantastic",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "awesome",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "excellent",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "definite",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "like",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "up",
				"count": 0,
				crutchWordsId: _id
			},
			{
				"word": "presently",
				"count": 0,
				crutchWordsId: _id
			}
		];

		let crutchSaid = [];
		let crutchCount;
		let crutchReturn = [];

		if (crutchWords.length > 0) {
			for (let i = 0; i < crutchWords.length; i++) {
				const rgxp = new RegExp("(\\S*)?(" + crutchWords[i].word + ")(\\S*)?", "ig");
				crutchCount = (transcript.split(crutchWords[i].word).length - 1);
				transcript.replace(rgxp, function (match, $1, $2, $3) {
					crutchSaid.push(($1 || "") + $2 + ($3 || ""));
				});
				crutchReturn.push(crutchWords[i].count = crutchCount);
			}
		}
		/* Find the Crutch Words in Transcription User Identified */
		const newCrutchWords = new CrutchWords({
			words: crutchSaid,
			count: crutchReturn.reduce(function (acc, val) {
				return acc + val;
			}),
			crutchWordsId: crutchWords[0].crutchWordsId,
			transcription: transcript,
			chartData: crutchCount
		});
		newCrutchWords.save(function () {
			console.log('Crutch Words Saved');
			console.log(newCrutchWords);
			console.log('====================');

			Transcription.findOneAndUpdate({
					_id: newCrutchWords.crutchWordsId
				}, {
					$push: {
						crutchWords: newCrutchWords
					}
				}),
				function (err, found) {
					console.log(found, "FoundCategory Before product Ids in it<<<<<<<<");
					if (err) {
						console.log(err)
					} else {
						found.crutchWords.push(newCrutchWords);

						found.save();
						console.log(found, "FoundCategory AFTER product Ids in it<<<<<<<<")
					}
				}
		})
	}

	app.get('/api/account/words', (req, res, next) => {
		/* Get Transcription Object ID */
		const {
			query
		} = req;
		/* ?token=test */
		const {
			id
		} = query;
		/* Get Words */
		CrutchWords.find({
			crutchWordsId: id,
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
					doc
				});
			}
		});
	});

}