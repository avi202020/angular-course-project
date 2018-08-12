const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let categorySchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  name: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Category already exists.']},
  creationDate: {type: mongoose.Schema.Types.Date, required: REQUIRED_VALIDATION_MESSAGE, default: Date.now}
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
