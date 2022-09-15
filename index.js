const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = process.env.PORT || 800

// Error handler
require('express-async-errors')

// Server configuration
app.set('etag', false)
app.enable('trust proxy')
app.disable('x-powered-by')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(compression())
app.use(morgan('common'))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

// Route management
const Routes = require('./routes')
Routes.initialize(app)

// 404 middleware express
app.use('*', function (req, res) {
  return res.redirect(301, '/app')
})

// Error middleware express
app.use((err, req, res, next) => {
  if (err.port === 3306 || err.sqlState) {
    console.log(`ERROR: ${err.message}`)
    return res.status(200).json({ success: false, message: 'Error databases, host can\'t be reached' })
  } else {
    return res.status(200).json({ success: false, message: err.message })
  }
})

// Listen port
app.listen(port, async () => {
  console.log(`Server is running on port ${port}!`)
})