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
            }
        },
        json: true
    };
    request(options, function(err, response, body) {
		if (err) throw new Error(err);
		console.log(JSON.stringify(body.results));
		// console.log('Transcript');
		// console.log(JSON.stringify(body.results[0].alternatives[0].transcript));
		// console.log('Confidence Level');
        // console.log(JSON.stringify(body.results[0].alternatives[0].confidence));
    });
}

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
    app.post('/api/account/upload', function(req, res, next) {
        const busboy = new Busboy({
            headers: req.headers
        });
        const element1 = req.body.element1;
        const convertedFile = btoa(req.files.element2.data);
        // console.log(file);
        // The file upload has completed
        busboy.on('finish', function() {
            /* Converts File to Base64 */
            const file = convertedFile;

            console.log('Upload finished');
            /* Call googleTranslate Function */
            googleTranslate(file);
        });
        req.pipe(busboy);
    });
    // busboyPromise(req)
    //     .then(function(parts) {
    //         for (var name in parts.fields) {
    //             var field = parts.fields[name];
    // console.log('field name:', req.files.element2.name, 'value:', req.files.element2.data);
    // }
    // console.log('File [' + req.files.element2.name + '] Finished');
    // console.log('File Type [' + req.files.element2.mimetype + ']');
    // console.log('File Encoding [' + req.files.element2.encoding + ']');

    /* The File Uploaded */
    // console.log('File Uploaded:');
    // console.log(req.files.element2);
    // console.log('File Data');
    // console.log(req.files.element2.data);
    // console.log('File Name:');
    // console.log(req.files.element2.name);


    // console.log(solution.file);
    //     }).then(function(result) {
    //         // Do stuff
    //         const options = {
    //             method: 'POST',
    //             url: 'https://speech.googleapis.com/v1/speech:recognize',
    //             qs: {
    //                 key: 'AIzaSyBmBNjnnHCRvNv8pdo_90qo5Fu-hjdIz8M'
    //             },
    //             headers: {
    //                 'Cache-Control': 'no-cache',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: {
    //                 audio: {
    //                     content: file
    //                 },
    //                 config: {
    //                     "languageCode": "en-US",
    //                 }
    //             },
    //             json: true
    //         };
    //         request(options, function(err, response, body) {
    //             if (err) {
    //                 return res.send({
    //                     success: false,
    //                     message: 'File Not Uploaded'
    //                 });
    //             }
    //             // console.log(JSON.stringify(body.results));
    //         })
    //         return res.send({
    //             success: true,
    //             message: 'File Uploaded!'
    //         }).then(function(result) {
    //             /* Save Google Transcription to User */
    //             let newTranscription = JSON.stringify(body.results);
    //             Transcription
    //                 .findByIdAndUpdate(user._id, { $set: { title: req.files.element2.name } }, { $set: { body: newTranscription } })
    //                 .then(result => res.json(result))
    //                 .catch(err => res.json(err));
    //         })
    //     }).catch(function(error) {
    //         // Handle error
    //         return res.send({
    //             success: false,
    //             message: 'no file'
    //         })
    //     });
    //     req.pipe(busboy);
    // });

    /* Get Transcription from User */

    /* Find the Crutch Words in Transcription User Identified */

    /* Save the Count of How Many Times Transcribed Words appear in Transcription */

    /* Get the Transcription and Amount of Times Crutch Words are Said from DB */
}