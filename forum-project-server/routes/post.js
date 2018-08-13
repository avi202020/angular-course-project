const express = require('express')
const authCheck = require('../config/auth-check')
const Post = require('../models/Post')
const Category = require('../models/Category')
const Comment = require('../models/Comment')

const router = new express.Router()

async function validatePostForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 6) {
    isFormValid = false
    errors.title = 'Post title must be at least 6 symbols.'
  }

  if (!payload || typeof payload.body !== 'string' || payload.body.length < 10 || payload.body.length > 1000) {
    isFormValid = false
    errors.body = 'Body must be between 10 and 1000 symbols'
  }

  let category = payload.category
  let categoryId
  let validCategory = false

  await Category
    .findOne({name: category})
    .then(obj => {
      categoryId = obj._id
      validCategory = true
    })
    .catch(() => {
      errors.category = 'Category not valid'
      validCategory = false
    })

  if (!payload || typeof payload.category !== 'string' || !validCategory) {
    isFormValid = false
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors,
    categoryId
  }
}

router.post('/create', authCheck, async (req, res) => {
  const postObj = req.body
  const validationResult = await validatePostForm(postObj)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  postObj.category = validationResult.categoryId
  postObj.author = req.user._id

  Post
    .create(postObj)
    .then((createdPost) => {
      res.status(200).json({
        success: true,
        message: 'Post added successfully.',
        data: createdPost
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
})

router.post('/edit/:id', authCheck, async (req, res) => {
  const postId = req.params.id
  let post = await Post.findById(postId)
  if (req.user._id.toString() === post.author.toString() || req.user.roles.indexOf('Admin') > -1) {
    const postObj = req.body
    const validationResult = await validatePostForm(postObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    postObj.category = validationResult.categoryId
    postObj.author = req.user._id

    Post
      .findById(postId)
      .then(existingPost => {
        existingPost.title = postObj.title
        existingPost.body = postObj.body
        existingPost.category = postObj.category
        existingPost.creationDate = Date.now()

        existingPost
          .save()
          .then(editedPost => {
            res.status(200).json({
              success: true,
              message: 'Post edited successfully.',
              data: editedPost
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
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
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

router.get('/all', (req, res) => {
  Post
    .find()
    .populate('comments')
    .then(posts => {
      res.status(200).json(posts)
    })
})

router.delete('/delete/:id', authCheck, async (req, res) => {
  const postId = req.params.id
  let post = await Post.findById(postId)
  if (req.user._id.toString() === post.author.toString() || req.user.roles.indexOf('Admin') > -1) {
    let postComments = post.comments
    for (let id of postComments) {
      await Comment.findById(id)
        .remove()
    }
    Post
      .findById(postId)
      .then((post) => {
        post
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Post deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
