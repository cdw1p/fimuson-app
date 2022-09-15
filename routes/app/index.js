const router = require('express').Router()

/**
 * @description: get app
 */
router.get('/', async (req, res) => {
  res.render('app/index')
})

module.exports = router