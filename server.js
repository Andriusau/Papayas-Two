const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;


const config = require('./config/config');
// Connect to the Mongo DB
// const isDev = process.env.NODE_ENV !== 'production';
// const port = process.env.PORT || 8080;
// Set up Mongoose
// mongoose.connect(config.db);
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/login_demo');
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static('client/build'));
// Add routes, both API and view
routes = require('./routes');
app.use(routes);


// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
// module.exports = app;