const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
// =============================================================================

// Initializing express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// =============================================================================

//Setting up the database
const config = require('../config/database');
mongoose.Promise = Promise;
mongoose
    .connect(config.database)
    .then(result => {
        console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
    })
    .catch(err => console.log('There was an error with your connection:', err));

// Setup Middleware
// =============================================================================
// Morgan middleware
app.use(logger('dev'));

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Directories
app.use(express.static('client/build'));
app.get('*', function(req, res) {
	    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
	    res.end();
	});

// Routes
//============================================================================
//setting up routes
require('./routes')(app);

// Listener
// =============================================================================
//starting server

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;