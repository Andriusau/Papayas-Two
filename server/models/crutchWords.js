const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crutchWordsSchema = new Schema({
    body: String
});

const crutchWords = module.exports = mongoose.model('crutchWords', crutchWordsSchema);

const crutchWords = mongoose.model('crutchWords', crutchWordsSchema);
module.exports = crutchWords;