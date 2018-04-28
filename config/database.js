/* Copy this file as config.js in the same folder, with the proper database connection URI. */
module.exports = {
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/papayas_db'
};