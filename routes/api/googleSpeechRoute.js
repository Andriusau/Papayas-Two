require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const User = require('../../models/userModel');
const AudioFile = require('../../models/audioFileModel');
const Busboy = require('busboy');
const busboyPromise = require('busboy-promise');
const speech = require('@google-cloud/speech');
const request = require("request");
const fs = require('fs');



module.exports = (app) => {

    app.get('/api/account/users', (req, res, next) => {
        /* Get Token */
        /* ?token=test */
        const { query } = req;
        const { token } = query;

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
		/* Use Token in Query Params */
		const { body } = req.body;
		/* ?token=test */
        // const { token } = query;
		// const { body } = req;

        const busboy = new Busboy({
            headers: req.headers
        });
        const element1 = req.body.element1;
        const convertedFile = btoa(req.files.element2.data);
        // console.log(file);
        /* The file upload has completed */
        busboy.on('finish', function() {
            /* Converts File to Base64 */
            const file = convertedFile;

            console.log('Upload finished');
            /* Call googleTranslate Function */
            googleTranslate(file);
        });
		req.pipe(busboy);
    });

	function googleTranslate(file) {
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
			console.log(JSON.stringify(body.results));
			let transcription = {
				transcription: JSON.stringify(body.results)
			};
			console.log('transcription: ' + JSON.stringify(body.results[0].alternatives[0].transcript));
			console.log(transcription);
			Transcription.create((transcription))
			});
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
	/* Save the Transcription to the User's Profile */
		function saveTranscription(transcription) {
			User.findById(id, function (err, users) {
				if (err) {
					return res.send({
						success: false,
						message: 'Error: Invalid Password!'
					});
					const transcribedAudio = new Transcription();
					/* Map Transcription to User Profile in MongoDB */
					transcribedAudio.transcription = transcription;
					transcribedAudio.save((err, users) => {
						if (err) {
							return res.send({
								success: false,
								message: err.message
							});
						}
						return res.send({
							success: true,
							message: 'File Saved!'
						});
					});
				}
			});
		}
	}
    /* Get Transcription from User */

    /* Find the Crutch Words in Transcription User Identified */

    /* Save the Count of How Many Times Transcribed Words appear in Transcription */

    /* Get the Transcription and Amount of Times Crutch Words are Said from DB */
}