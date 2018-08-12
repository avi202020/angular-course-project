const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let commentSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  text: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  creationDate: {type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now},
  postId: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Post'}
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
