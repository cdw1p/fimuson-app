const router = require('express').Router()
const axios = require('axios')

/**
 * @description: get data music
 */
router.get('/', async (req, res) => {
  const { query } = req.query
  const tempDataMusic = []
  for (let i = 0; i < 2; i++) {
    const { data } = await axios.get(`https://www.shazam.com/services/search/v4/id/ID/web/search?term=${query}&numResults=40&offset=${i}&types=artists,songs&limit=40`)
    for (let [indexMusic, dataMusic] of data.tracks.hits.entries()) {
      const { title, subtitle, share } = data.tracks.hits[indexMusic].track
      tempDataMusic.push({ title, subtitle, share })
    }
  }
  return res.json({ success: true, data: tempDataMusic })
})

module.exports = router