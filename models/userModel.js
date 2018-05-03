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
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
	crutchWords: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CrutchWords',
			default: ''
		}
	],
	countCrutchWords: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CountCrutchWords',
			default: ''
		}
	],
	audioFile: [
		{
        type: Schema.Types.ObjectId,
		ref: 'AudioFile',
		default:''
		}
	],
	transcriptions: [
		{
        type: Schema.Types.ObjectId,
		ref: 'Transcription',
		default:''
		}
	],
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