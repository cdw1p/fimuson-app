module.exports.initialize = function (app) {
  // API
  app.use('/api/v1/search', require('./api/v1/search'))

  // App
  app.use('/app', require('./app'))
}