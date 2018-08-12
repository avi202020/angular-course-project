const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')
const encryption = require('../utilities/encryption')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.find({}).then(users => {
      if (users.length > 0) return
      let salt = encryption.generateSalt()
      let password = encryption.generateHashedPassword(salt, '12345678')

      User.create({
        email: 'admin@admin.com',
        username: 'Admin',
        salt: salt,
        password: password,
        roles: ['Admin']
      })
        .then(() => {
          User.find({}).then(users => {
            let authorId = users[0]._id
            Category.find({}).then(categories => {
              if (categories.length > 0) return
              const categoriesSeed = [
                {
                  name: 'Football',
                  creator: authorId
                },
                {
                  name: 'Education',
                  creator: authorId
                },
                {
                  name: 'Basketball',
                  creator: authorId
                },
                {
                  name: 'Marketing',
                  creator: authorId
                },
                {
                  name: 'Programming',
                  creator: authorId
                },
                {
                  name: 'Game Theory',
                  creator: authorId
                }
              ]
              Category
                .create(categoriesSeed)
                .then(() => console.log('Seeded categories successfully.'))
                .catch((error) => console.log('Error: ' + error))
            })
          })
        })
    })
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
