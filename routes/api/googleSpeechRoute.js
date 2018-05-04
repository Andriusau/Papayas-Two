require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');
const AudioFile = require('../../models/audioFileModel');
const Busboy = require('busboy');
const busboyPromise = require('busboy-promise');
const speech = require('@google-cloud/speech');
const request = require("request");
const fs = require('fs');



module.exports = (app) => {
    /* Uploading and Transcribing Audio File */
	app.post('/api/account/upload', function (req, res, next) {
		/* Use Token in Query Params */
		const { body } = req.body;
		// const { token } = body;
		// let { transcription } = body;

		/* Error Handling if Audio File is Not Submitted */
		// if (!transcription) {
		// 	return res.send({
		// 		success: false,
		// 		message: 'Error: Must Upload Audio File!'
		// 	});
		// }
		/* If Audio File is Uploaded Follow the Below */
        const busboy = new Busboy({
            headers: req.headers
        });
		const token = req.body.element1;
		console.log(token);
        const convertedFile = btoa(req.files.element2.data);
        // console.log(file);
        /* The file upload has completed */
        busboy.on('finish', function() {
            /* Converts File to Base64 */
			const file = convertedFile;
			// const token = token;
            console.log('Upload finished');
            /* Call googleTranslate Function */
            googleTranslate(file, token);
        });
		req.pipe(busboy);
    });

	function googleTranslate(file, token) {
	/* Set Up Request to Google Speech API */
		// const { token } = token
		// console.log(token);
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
				"languageCode": "en-US",
				// "speechContext": {
				// 	"phrases":['like um']
				// }
            }
        },
        json: true
    };
		request(options, function (err, res, body) {
			if (err) throw new Error(err);
			/* The File Uploaded Object */
			let transcription = {
				transcription: JSON.stringify(body.results[0].alternatives[0].transcript),
				transcriptionId: token
			};
			// console.log('transcription: ' + JSON.stringify(body.results[0].alternatives[0].transcript));
			console.log(transcription);
			/* Create a the Transcription in the Transcriptions Collection */
			Transcription.create(transcription);
			/* Save the Transcription to the User's Profile */
			const newTranscription = new Transcription({
				transcription: transcription,
				transcriptionId: transcription._id
				// transcriptionId: token

			});
			newTranscription.save(function () {
				console.log('transcription saved');
				console.log(newTranscription._id);


				Transcription.findOne({ _id: newTranscription._id })
					.then(function (dbTranscription) {
					console.log(dbTranscription);
				}).catch(function (err) {
					console.log(err.message);
				})
			});
			// Transcription.find({
			// 	transcription: transcription
			// }, (transcription) => {

			// 		/* Step 2: Save the new user */
			// 		const newTranscription = new Transcription();
			// 		// newTranscription.userID = user._id;
			// 		newTranscription.transcription = transcription;
			// 		newTranscription.save((err, transcription) => {
			// 			if (err) {
			// 				return res.send({
			// 					success: false,
			// 					message: err.message
			// 				});
			// 			}
			// 			return res.send({
			// 				success: true,
			// 				message: 'Transcription Saved!'
			// 			});
			// 		})


			// });
		});
	}
}

			// Transcription.create({
			// 	userId: token,
			// 	transcription: transcription
			// })

			// Transcription.findById(id, function (err, users) {
			// 	User.save((err, users) => {
			// 		if (err) {
			// 			return res.send({
			// 				success: false,
			// 				message: err.message
			// 			});
			// 		}
			// 		return res.send({
			// 			success: true,
			// 			message: 'File Saved!'
			// 		});
			// 	});
			// });
        // console.log('Transcript');
		// console.log(JSON.stringify(body.results[0].alternatives[0].transcript));
        // console.log('Confidence Level');
        // console.log(JSON.stringify(body.results[0].alternatives[0].confidence));

		// if (!transcription) {
        //     return res.send({
        //         success: false,
        //         message: 'Error: No File!'
        //     });
        // }

		// function saveTranscription(transcription) {

		// }



    /* Find the Crutch Words in Transcription User Identified */

    /* Save the Count of How Many Times Transcribed Words appear in Transcription */

    /* Get the Transcription and Amount of Times Crutch Words are Said from DB */
