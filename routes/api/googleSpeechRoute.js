//Take these keys in keys.js add the program to this one
// const keys = require('../keys/keys');
// const Busboy = require('busboy');
const Speech = require('../../models/speechModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
// const speech = require('@google-cloud/speech');
// const base64 = require('base-64');
// const utf8 = require('utf8');
// require('dotenv').config();

module.exports = (app) => {
    /* Get Audio File from Front End  */
    /*
    /* The following is an example of making file upload with additional body parameters. */
    /* To make a call with PostMan */
    /* Don't put any headers (content-type) */
    /* Under body: */
    /* check form-data */
    /* Put the body with "element1": "test", "element2": image file */

    /* Get User Who is Saving the Audio */

    /* Create a New Audio File Entry in DB */

    /* Send Audio File to Google for Transcription */

    /* Save Google Transcription to User */

    /* Parse the Transcribed Words from Transcription */

    /* Find the Crutch Words in Transcription User Identified */

    /* Save the Count of How Many Times Transcribed Words appear in Transcription */

    /* Get the Transcription and Amount off Times Crutch Words are Said from DB */

    /* Send the Transcription and Amount off Times Crutch Words are Said to the Front End to get Displayed */
    app.post('/api/account/translate', upload.single('audioFile'), (req, res, next) => {
        console.log(req.file);
        const speech = new Speech({
            // _id: new mongoose.Types.ObjectId(),
            audioName: req.body.name,
            audioFile: req.file
        });
        if (!audioFile) {
            return res.send({
                success: false,
                message: 'Error: Must Upload Audio File!'
            });
        }
        /* Error Handling if Crutch Words Field is Blank */
        if (!audioName) {
            return res.send({
                success: false,
                message: 'Error: Must Include Your Crutch Words!'
            });
        }
        speech
            .save()
            .then(result => {
                console.log(result);
            });
        // 	UserSession.find({
        //         _id: token,
        //         isDeleted: false
        //     }, (err, sessions) => {
        //         if (err) {
        //             return res.send({
        //                 success: false,
        //                 message: 'Error: Server Error During User Verification'
        //             });
        //         } else if (sessions.length != 1) {
        //             return res.send({
        //                 success: false,
        //                 message: 'Error: Invalid User Verification'
        //             });
        //         } else {
        //             return res.send({
        //                 success: true,
        //                 message: 'User is Verified'
        //             });
        //         }
        // 	});
    });
    // const speech = new Speech({
    // 	_id: new mongoose.Types.ObjectId(),
    // 	audioName: req.body.name
    // })
    // const { body } = req;
    /* This grabs the additional parameters so in this case passing in  "element1" with a value. */
    // let crutchWords = req.body.element1;
    /* Grabs your file object from the request. */
    // let file = req.files.element2;
    // console.log(file);

    // const busboy = new Busboy({
    // 	headers: req.headers
    // });
    // console.log(crutchWords);
    // let {
    // 	audioFile,
    // 	crutchWords
    // } = body;
    // console.log(body);
    /* Error Handling if Audio File Field is Blank */

    /* Convert Audio File to Base64 Encoding */

    /* Convert Crutch Words to Array */


    /* The file upload has completed */
    // busboy.on('finish', function () {
    // 	console.log('Upload finished');
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

    // });
}