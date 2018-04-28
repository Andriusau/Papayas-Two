// const router = require("express").Router();
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');

module.exports = (app) => {
    /* Sign In Route */
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

        /* Make Sure Email field is not blank */
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

        /* Check if User exist in MongoDB */
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

            /* Check if submitted password is valid */
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password!'
                });
            }

            /* Otherwise Correct Password Entered Associated to User */
            const userSession = new UserSession();
            userSession.userID = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error During Sign In'
                    });
                }
                return res.send({
                    success: true,
                    message: 'User Has Signed In',
                    token: doc._id
                });
            });
        });
    });
    /* End Sign In Route */

    /* Verify Sign In */
    app.get('/api/account/verify', (req, res, next) => {
        /* Get Token */
        const {
            query
        } = req;
        /* ?token=test */
        const {
            token
        } = query;

        /* Verify the Token is Unique and NOT Deleted */
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error During User Verification'
                });
            } else if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid User Verification'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'User is Verified'
                });
            }
        });
    });
    /* End Verify Token */
}