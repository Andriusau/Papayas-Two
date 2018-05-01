// const router = require("express").Router();
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');

module.exports = (app) => {
    /* Logout Route */
    app.get('/api/account/logout', (req, res, next) => {
        /* Get Token */
        /* ?token=test */
        const { query } = req;
        const { token } = query;

        /* Verify the Token is Unique and NOT Deleted */
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
                    message: 'Error: Server Error During User Logout'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'You\'re Logged Out'
                });
            }
        });
    });
    /* End Logout */

}