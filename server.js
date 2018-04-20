const nodemon = require('nodemon');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static('client/build'));
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const config = require('./config/config');
mongoose.Promise = Promise;
mongoose
    .connect(config.database)
    .then(result => {
        console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
    })
    .catch(err => console.log('There was an error with your connection:', err));


nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'server/*'),
        ignore: [],
        watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
        ext: 'js'
    })
    .on('restart', function() {
        console.log('Server restarted!');
    })
    .once('exit', function() {
        console.log('Shutting down server');
        process.exit();
    });

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});