const express = require('express')
const authCheck = require('../config/auth-check')
const User = require('../models/User')

const router = new express.Router()

async function validateUser (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.user !== 'string') {
    isFormValid = false
    errors.title = 'Empty user body'
  }

  let userId = payload.user
  let user
  let validUser = false

  await User
    .findById(userId)
    .then(obj => {
      user = obj
      validUser = true
    })
    .catch(() => {
      errors.user = 'User not valid'
      validUser = false
    })

  if (!validUser) {
    isFormValid = false
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors,
    user
  }
}

router.post('/ban', authCheck, async (req, res) => {
  const userObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = await validateUser(userObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    User.findById(userObj.user)
      .then(user => {
        if (user.isBanned === true) {
          return res.status(401).json({
            success: false,
            message: 'User is already banned'
          })
        }
        user.isBanned = true
        user
          .save()
          .then(bannedUser => {
            res.status(200).json({
              success: true,
              message: 'User banned successfully.',
              data: bannedUser
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            return res.status(401).json({
              success: false,
              message: message
            })
          })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/unban', authCheck, async (req, res) => {
  const userObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = await validateUser(userObj)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    User.findById(userObj.user)
      .then(user => {
        console.log(user);
        if (user.isBanned === false) {
          return res.status(401).json({
            success: false,
            message: 'User is not banned'
          })
        }
        user.isBanned = false
        user
          .save()
          .then(bannedUser => {
            res.status(200).json({
              success: true,
              message: 'User unbanned successfully.',
              data: bannedUser
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            return res.status(401).json({
              success: false,
              message: message
            })
          })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    User
      .find()
      .then(users => {
        res.status(200).json(users)
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
