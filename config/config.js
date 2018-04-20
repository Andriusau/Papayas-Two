// Copy this file as config.js in the same folder, with the proper database connection URI.
module.exports = {
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/papayas_db',
};

// const config = {
// 	//   db: process.env.MONGO_URL || 'mongodb://localhost:27017/papayas_three',
// 	db: process.env.MONGODB_URI || 'mongodb://username:password@url:port/db',port: process.env.PORT || 8000,
// };

// module.exports = {
//     db: process.env.MONGODB_URI || 'mongodb://localhost:27017/papayas_db',
// };
// export default config;