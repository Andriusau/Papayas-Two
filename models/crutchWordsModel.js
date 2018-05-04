const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crutchWordsSchema = new Schema({
    crutchWords: String,
});

const CrutchWords = module.exports = mongoose.model('CrutchWords', crutchWordsSchema);