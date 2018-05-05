require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const CrutchWords = require('../../models/crutchWordsModel');
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');
const AudioFile = require('../../models/audioFileModel');
const Busboy = require('busboy');
const busboyPromise = require('busboy-promise');
const speech = require('@google-cloud/speech');
const request = require('request');
const fs = require('fs');



module.exports = (app) => {
    /* Uploading and Transcribing Audio File */
	app.post('/api/account/upload', function (req, res, next) {
		/* Use Token in Query Params */
		const { body } = req.body;

		/* If Audio File is Uploaded Follow the Below */
        const busboy = new Busboy({
			headers: req.headers
		});
		const token = req.body.element1;
		console.log(token);
        const convertedFile = btoa(req.files.element2.data);

        /* The file upload has completed */
        busboy.on('finish', function() {
            /* Converts File to Base64 */
			const file = convertedFile;
            console.log('Upload finished... Starting Translation');
            /* Call googleTranslate Function */
            googleTranslate(file, token);
        });
		req.pipe(busboy);
    });

	function googleTranslate(file, token) {
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
		request(options, function (err, res, body) {
			if (err) throw new Error(err);
			/* The File Uploaded Object */
			console.log(JSON.stringify(body.results));
			let transcription = {
				transcription: JSON.stringify(body.results[0].alternatives[0].transcript),
				transcriptionId: token
			};

			/* Create a the Transcription in the Transcriptions Collection */
			Transcription.create(transcription);
			/* Save the Transcription to the User's Profile */
			console.log(transcription);
			// console.log(transcription.transcription);
			console.log(transcription.transcriptionId);

			const newTranscription = new Transcription(
				{transcription: transcription, transcriptionId: transcription._id}
			);
			newTranscription.save(function () {
				console.log('transcription saved');
				console.log(newTranscription);
				console.log(newTranscription._id);


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
					.then(function (result) {
						console.log(result);
						/* Call Crutch Words Promise Function Here */
						let finalT = transcription.transcription.toLowerCase();
						getCrutchWords(finalT);


					}).catch(function (err) {
						console.log(err.message);
					})
				});
			});
		} /* End Google Transcription Function */

		/* Find the Crutch Words in Transcription User Identified */
    // var transcript  = " hello I wonder if this will work and something will happen and then something else will happen and name name name wonder wonder this";


    function getCrutchWords(transcript) {
    	const crutchWords = [{
                "word": "just",
                "count": 0
            },
            {
                "word": "almost",
                "count": 0
            },
            {
                "word": "basically",
                "count": 0
            },
            {
                "word": "actually",
                "count": 0
            },
            {
                "word": "definitely",
                "count": 0
            },
            {
                "word": "literally",
                "count": 0
            },
            {
                "word": "really",
                "count": 0
            },
            {
                "word": "very",
                "count": 0
            },
            {
                "word": "truly",
                "count": 0
            },
            {
                "word": "essentially",
                "count": 0
            },
            {
                "word": "seriously",
                "count": 0
            },
            {
                "word": "totally",
                "count": 0
            },
            {
                "word": "honestly",
                "count": 0
            },
            {
                "word": "obviously",
                "count": 0
            },
            {
                "word": "so",
                "count": 0
            },
            {
                "word": "anyway",
                "count": 0
            },
            {
                "word": "well",
                "count": 0
            },
            {
                "word": "right",
                "count": 0
            },
            {
                "word": "okay",
                "count": 0
            },
            {
                "word": "well",
                "count": 0
            },
            {
                "word": "great",
                "count": 0
            },
            {
                "word": "fantastic",
                "count": 0
            },
            {
                "word": "awesome",
                "count": 0
            },
            {
                "word": "excellent",
                "count": 0
            },
            {
                "word": "definite",
                "count": 0
            },
            {
                "word": "like",
                "count": 0
            },
            {
                "word": "up",
                "count": 0
            },
            {
                "word": "presently",
                "count": 0
            }
        ];

        let crutchSaid = [];
        let crutchCount;
        let crutchReturn = [];


        if (crutchWords.length > 0) {
            for (let i = 0; i < crutchWords.length; i++) {
                const rgxp = new RegExp("(\\S*)?(" + crutchWords[i].word + ")(\\S*)?", "ig");

                crutchCount = (transcript.split(crutchWords[i].word).length - 1);
                transcript.replace(rgxp, function(match, $1, $2, $3) {
                    crutchSaid.push(($1 || "") + $2 + ($3 || ""));

                });
                //console.log(crutchWords[i] + " " + crutchCount);
                crutchReturn.push(crutchWords[i].count = crutchCount);
            }
        }
		console.log(crutchWords);
		CrutchWords.create(crutchWords);
        //   return crutchWords;
        // uniqueify crutchSaid
        // counting the occourances of the unqiued words in crutchSaid
        // store count in crutchCount
    }
		/* Find the Crutch Words in Transcription User Identified */

	/* Save the Count of How Many Times Transcribed Words appear in Transcription */

	/* Get the Transcription and Amount of Times Crutch Words are Said from DB */
}

