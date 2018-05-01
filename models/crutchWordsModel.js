const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crutchWordsSchema = new Schema({
    body: String,
});

const CrutchWords = module.exports = mongoose.model('CrutchWords', crutchWordsSchema);