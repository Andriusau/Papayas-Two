//Take these keys in keys.js add the program to this one
// const keys = require('../keys/keys');
const Busboy = require('busboy');
// const speech = require('@google-cloud/speech');
// const base64 = require('base-64');
// const utf8 = require('utf8');
// require('dotenv').config();

module.exports = (app) => {
	/* Get Audio File from Front End  */
	/*
	 *The following is an example of making file upload with additional body parameters.
	 *To make a call with PostMan
	 * Don't put any headers (content-type)
	 * Under body:
	 * check form-data
	 * Put the body with "element1": "test", "element2": image file
	 */
	app.post('/api/account/translate', (req, res, next) => {
		const { body } = req;
		/* This grabs the additional parameters so in this case passing in  "element1" with a value. */
		// let element1 = req.body.element1;
		// console.log(element1);
		let {
			audioFile,
			crutchWords
		} = body;
		/* Error Handling if Audio File Field is Blank */
        if (!audioFile) {
            return res.send({
                success: false,
                message: 'Error: Must Upload Audio File!'
            });
		}
		/* Error Handling if Crutch Words Field is Blank */
        if (!crutchWords) {
            return res.send({
                success: false,
                message: 'Error: Must Include Your Crutch Words!'
            });
		}
		/* Convert Audio File to Base64 Encoding */

		/* Convert Crutch Words to Array */

		const busboy = new Busboy({
			headers: req.headers
		});
		/* The file upload has completed */
		busboy.on('finish', function () {
			console.log('Upload finished');
			/* Your files are stored in req.files. In this case, you only have one and it's req.files.element2: */
			/* This returns:
			 * {
			 *	element2: {
			 *	data: ...contents of the file...,
			 *	name: 'Example.jpg',
			 *	encoding: '7bit',
			 *	mimetype: 'image/png',
			 *	truncated: false,
			 *	size: 959480
			 * 		}
			 * }
			 */
			/* Grabs your file object from the request. */
			let file = req.files.element2;
			console.log(file);

			/* Begins the Google Speech API */
			/*
			var request = require("request");
			var google = new Google(keys.google);
			var options = {
				method: 'POST',
				url: 'https://speech.googleapis.com/v1/speech:recognize',
				qs: {
					key: google
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
						languageCode: 'en-US'
					}
				},
				json: true
			};

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				console.log(body);
			});
			*/
		})
	});
}