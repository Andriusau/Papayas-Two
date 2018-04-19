const fs = require('fs');
const path = require('path');
const router = require("express").Router();
const apiRoutes = require("./api/signUpRoutes");

module.exports = (app) => {
    // API routes
    fs.readdirSync(__dirname + '/api/').forEach((file) => {
        require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
    });
    // router.use("/api", apiRoutes);

    // If no API routes are hit, send the React app
	fs.readdirSync(__dirname + '/api/').forEach((file) => {
		router.use(function (req, res) {
				res.sendFile(path.join(__dirname, "../client/build/index.html"));
		});
	});
};