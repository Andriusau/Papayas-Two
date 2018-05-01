const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countCrutchWordsSchema = new Schema({
    body: String,
});

const CountCrutchWords = module.exports = mongoose.model('CountCrutchWords', countCrutchWordsSchema);