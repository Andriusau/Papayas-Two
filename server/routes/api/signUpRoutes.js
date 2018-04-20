// const router = require("express").Router();
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');

module.exports = (app) => {
    /* Sign Up Route*/
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        // Permanent Variables
        const {
            firstName,
            lastName,
            password
        } = body;
        // Variables that can be changed
        let {
            email,
            crutchWords
        } = body;
        // Error Handling if Fields on Sign Up Page are Blank
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
        // if (!crutchWords) {
        //     return res.send({
        //         success: false,
        //         message: 'Error: Please Enter At Least One Crutch Word!'
        //     });
        // }
        email = email.toLowerCase();
        // crutchWords = crutchWords.toLowerCase();

        // Now that fields have been filled in need to do the following:
        // Step 1: Verify Email Doesn't Exist
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
            // Step 2: Save the new user
            const newUser = new User();
            // Map values from sign on page to MongoDB fields
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.crutchWords = crutchWords;
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
    // End Sign Up Route

    /* Sign In Route*/
    app.post('/api/account/signin', (req, res, next) => {
        const {
            body
        } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        // Make SUre Email field is not blank
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

        // Check if User exist in MongoDB
        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password!'
                });
            }

            // Check if submitted password is valid
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password!'
                });
            }

            // Otherwise Correct Password Entered Associated to User
            const userSession = new UserSession();
            userSession.userID = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid Sign In',
                    token: doc._id
                });
            });
        });
    });
    // End Sign In Route

    /*
     ** Verify Sign In
     */
    app.get('/api/account/verify', (req, res, next) => {
        // Get Token
        const {
            query
        } = req;
        // token=test
        const {
            token
        } = query;

        // Verify the Token is Unique and NOT Deleted
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            } else if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'You\'re Good'
                });
            }
        });
    });
    // End Verify Token

    /*
     ** Logout Route
     */
    app.get('/api/account/logout', (req, res, next) => {
        // Get Token
        // token=test
        const {
            query
        } = req;
        const {
            token
        } = query;

        // Verify the Token is Unique and NOT Deleted
        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'You\'re Good'
                });
            }
        });
    });
	// End Logout

}