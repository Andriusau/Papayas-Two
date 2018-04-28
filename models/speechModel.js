const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const speechSchema = new Schema({
    title: String,
    body: String,
    // audioName: {
    //     type: String,
    //     default: ''
    // },
    // crutchWords: [
    // 	{
    //     type: Schema.Types.ObjectId,
    //     ref: 'crutchWords'
    // 	}
    // ],
    // audioFile: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'crutchWords'
    // }],
    // transcriptions: [
    // 	{
    //     type: Schema.Types.ObjectId,
    //     ref: 'transcriptions'
    // 	}
    // ],
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }
});

const Speech = module.exports = mongoose.model('Speech', speechSchema);