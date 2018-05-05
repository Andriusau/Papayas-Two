require('dotenv').config();
//Take these keys in keys.js add the program to this one
const btoa = require('btoa');
const key = require('../keys/keys');
const Transcription = require('../../models/transcriptionModel');
const CrutchWords = require('../../models/crutchWordsModel');
const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');

module.exports = (app) => {
/* Observables */
	all = [];
	isLoading = false;

	app.get('/users', async function (req, res, next) {
		try {
			res.json(await Users())
		} catch (err) {
			next(err)
		}
	})

	app.get('/users/:id', async function (req, res, next) {
		try {
			res.json(await User(req.params.id))
		} catch (err) {
			next(err)
		}
	})

	app.use(function (err, req, res, next) {
		console.error(err)
		res.status(500).json({
			message: 'an error occurred'
		})
	})
}