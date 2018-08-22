const authRoutes = require('../routes/auth')
const categoryRoutes = require('../routes/category')
const postRoutes = require('../routes/post')
const commentRoutes = require('../routes/comment')
const userRoutes = require('../routes/user')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/category', categoryRoutes)
  app.use('/post', postRoutes)
  app.use('/comment', commentRoutes)
  app.use('/users', userRoutes)
}
