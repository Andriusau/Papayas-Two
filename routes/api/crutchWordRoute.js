const User = require('../../models/userModel');
const UserSession = require('../../models/userSessionModel');
const Transcription = require('../../models/transcriptionModel');
const CrutchWords = require('../../models/crutchWordsModel');

module.exports = (app) => {
	app.post('/api/account/words', (req, res, next) => {
		const { body } = req;
		let crutchWords = {
			crutchWords: body,
		};

		console.log(crutchWords);
		/* Add New Words */
		CrutchWords.create(crutchWords)
			.then(result => {
				User.findOne({
				_id: token
			}, {
				$set: {
					crutchWords: result.crutchWords
				}
			}, {
					new: true
				}) //saving reference to note in corresponding article
				.then(data => res.json(result))
			    .catch(err => res.json(err));
			})
			.catch(err => res.json(err));
	});
	/* End Verify Token */

	// app.get('/api/account/users', (req, res, next) => {
	// 	/* Get Token */
	// 	/* ?token=test */
	// 	const {query} = req;
	// 	const {token} = query;

	// 	/* Get User Who is Saving the Audio */
	// 	User.findOne({
	// 		_id: token
	// 	}, null, (err, doc) => {
	// 		if (err) {
	// 			return res.send({
	// 				success: false,
	// 				message: 'Error: You\'re Lost'
	// 			});
	// 		} else {
	// 			return res.send({
	// 				success: true,
	// 				message: 'You\'re Found',
	// 				firstName: doc.firstName,
	// 				lastName: doc.lastName,
	// 				email: doc.email,
	// 				crutchWords: doc.crutchWords,
	// 				countCrutchWords: doc.countCrutchWords,
	// 				audioFile: doc.audioFile,
	// 				transcription: doc.transcription
	// 			});
	// 		}
	// 	});
	// });
}