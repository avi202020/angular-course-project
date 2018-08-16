const express = require('express')
const authCheck = require('../config/auth-check')
const Category = require('../models/Category')

const router = new express.Router()

function validateCategoryForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Category name must be at least 3 symbols.'
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
  const categoryObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateCategoryForm(categoryObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    categoryObj.creator = req.user._id

    Category
      .create(categoryObj)
      .then((createdCategory) => {
        res.status(200).json({
          success: true,
          message: 'Category added successfully.',
          data: createdCategory
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Category with the given name already exists.'
        }
        return res.status(401).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const categoryId = req.params.id
    const categoryObj = req.body
    const validationResult = validateCategoryForm(categoryObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Category
      .findById(categoryId)
      .then(existingCategory => {
        existingCategory.name = categoryObj.name

        existingCategory
          .save()
          .then(editedCategory => {
            res.status(200).json({
              success: true,
              message: 'Category edited successfully.',
              data: editedCategory
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Category with the given name already exists.'
            }
            return res.status(401).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(401).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Category
    .find()
    .then(categories => {
      res.status(200).json(categories)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Category
      .findById(id)
      .then((category) => {
        category
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Category deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(401).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
