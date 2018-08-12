const express = require('express')
const authCheck = require('../config/auth-check.js')
const Comment = require('../models/Comment')

const router = new express.Router()

function validateCommentCreateForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.text !== 'string' || payload.text.length < 6) {
    isFormValid = false
    errors.text = 'Comment Text must be at least 6 symbols'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const commentObj = req.body
  const validationResult = validateCommentCreateForm(commentObj)
  if (!validationResult.success) {
    return res.json(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  commentObj.creator = req.user._id

  Comment
    .create(commentObj)
    .then((createdComment) => {
      res.status(200).json({
        success: true,
        message: 'Comment created successfully',
        data: createdComment
      })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/edit/:id', authCheck, async (req, res) => {
  const commentId = req.params.id
  let existingComment = await Comment.findById(commentId)
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
  if (req.user._id.toString() === existingComment.creator.toString() || req.user.roles.indexOf('Admin') > -1) {
    const commentObj = req.body
    const validationResult = validateCommentCreateForm(commentObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    existingComment.text = commentObj.text
    existingComment.creationDate = Date.now()

    existingComment
      .save()
      .then(editedComment => {
        res.status(200).json({
          success: true,
          message: 'Comment Edited Successfully.',
          data: editedComment
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.delete('/delete/:id', authCheck, async (req, res) => {
  const commentId = req.params.id
  let comment = await Comment.findById(commentId)
    .catch((err) => {
      console.log(err)
      const message = 'Entry does not exist!'
      return res.status(200).json({
        success: false,
        message: message
      })
    })

  if (req.user._id.toString() === comment.creator.toString() || req.user.roles.includes('Admin') > -1) {
    comment
      .remove()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Comment deleted successfully!'
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(200).json({
          success: false,
          message: 'Something went wrong :('
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials'
    })
  }
})

module.exports = router
