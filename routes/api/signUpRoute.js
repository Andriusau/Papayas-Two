// const router = require("express").Router();
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');

module.exports = (app) => {
    /* Sign Up Route*/
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        /* Permanent Variables */
        const {
            firstName,
            lastName,
            password
        } = body;
        /* Variables that can be changed */
        let {
            email,
			crutchWords,
			audioFile,
			transcription,
			countCrutchWords
        } = body;
        /* Error Handling if Fields on Sign Up Page are Blank */
        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First Name Cannot be Blank!'
            });
        }
        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First Name Cannot be Blank!'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last Name Cannot be Blank!'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email Cannot be Blank!'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password Cannot be Blank!'
            });
        }
        email = email.toLowerCase();

        /* Now that fields have been filled in need to do the following: */
        /* Step 1: Verify Email Doesn't Exist */
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Email Already Exists'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Previous User'
                });
            }
            /* Step 2: Save the new user */
            const newUser = new User();
            /* Map values from sign on page to MongoDB fields */
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
			newUser.crutchWords = crutchWords;
			newUser.countCrutchWords = countCrutchWords;
			newUser.audioFile = audioFile;
			newUser.transcription = transcription;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: err.message
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed Up!'
                });
            });
        });
    });
    /* End Sign Up Route */
}