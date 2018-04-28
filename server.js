const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const busboy = require('connect-busboy');
const Busboy = require('busboy');
const busboyBodyParser = require('busboy-body-parser');

/* Middleware */
app.use(busboy());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(busboyBodyParser());

/* API Routes */
require('./routes')(app);

/* Serve up static assets (usually on heroku) */
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

/* Send every request to the React app */
/* Define any API routes before this runs */
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

/* Setting up the database */
const config = require('./config/database');
mongoose.Promise = Promise;
mongoose
    .connect(config.database)
    .then(result => {
        console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
    })
    .catch(err => console.log('There was an error with your connection:', err));

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});