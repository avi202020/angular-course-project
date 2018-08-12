const authRoutes = require('../routes/auth')
const categoryRoutes = require('../routes/category')
const postRoutes = require('../routes/post')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/category', categoryRoutes)
  app.use('/post', postRoutes)
}
