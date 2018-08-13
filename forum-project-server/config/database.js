const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')
const encryption = require('../utilities/encryption')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

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
                .then(() => {
                  Category.findOne()
                    .then(category => {
                      const postSeed = [
                        {
                          title: 'Cristiano in Juventus',
                          body: 'When the rumours of a possible deal were first leaked, few believed it to be true. Ronaldo was simply doing his usual summer dance with Real Madrid',
                          author: authorId,
                          category: category._id,
                          comments: []
                        }
                      ]
                      Post
                        .create(postSeed)
                        .then(() => {
                          console.log('Seeded posts successfully.')
                          Post
                            .findOne()
                            .then(post => {
                              const commentsSeed = [
                                {
                                  creator: authorId,
                                  text: 'Forza Ronaldo',
                                  postId: post._id
                                }
                              ]
                              Comment
                                .create(commentsSeed)
                                .then((commentsSeedResult) => {
                                  console.log(commentsSeedResult)
                                  let postComments = post.comments
                                  postComments.push(commentsSeedResult[0]._id)
                                  post.comments = postComments
                                  post
                                    .save()
                                    .then(result => {
                                      console.log(result)
                                      console.log('Seeded comments successfully')
                                    })
                                    .catch(err => console.log('post save error: ' + err))
                                })
                                .catch(err => console.log('Comment:Error' + err))
                            })
                        })
                        .catch(error => console.log('Error:Post ') + error)
                    })
                })
                .catch((error) => console.log('Error: ' + error))
            })
          })
        })
    })
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
