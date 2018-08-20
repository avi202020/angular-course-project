const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'
// const User = require('../models/User')

let postSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  body: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  creationDate: {type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now},
  author: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  authorName: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  category: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Category'},
  comments: [{type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Comment'}]
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post
