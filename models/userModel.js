const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
		default: '',
		unique: true,
		match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
	},
	// `email` must be of type String
	// `email` must be unique
	// `email` must match the regex pattern below and throws a custom error message if it does not
    password: {
        type: String,
		default: '',
		trim: true,
		validate: [
			function (input) {
				return input.length >= 6;
			},
			"Password should be longer."
		]
	},
	// `password` must be of type String
	// `password` will trim leading and trailing whitespace before it's saved
	// `password` is a required field and throws a custom error message if not supplied
	// `password` uses a custom validation function to only accept values 6 characters or more
	transcriptions: [
		{
			// Store ObjectIds in the array
        type: Schema.Types.ObjectId,
		ref: 'Transcription',
		default:''
		}
	],
	  // `transcriptions` is an array that stores ObjectIds
	  // The ref property links these ObjectIds to the Transcription model
	  // This allows us to populate the User with any associated Transcriptions
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;