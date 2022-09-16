const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')

/**
 * @description: get data music
 */
router.get('/', async (req, res) => {
  const { query, type } = req.query
  const tempDataMusic = []
  if (type === 'api') {
    for (let i = 0; i < 2; i++) {
      const { data } = await axios.get(`https://www.shazam.com/services/search/v4/id/ID/web/search?term=${query}&numResults=40&offset=${i}&types=artists,songs&limit=40`)
      for (let [indexMusic, dataMusic] of data.tracks.hits.entries()) {
        const { title, subtitle, share } = data.tracks.hits[indexMusic].track
        tempDataMusic.push({ title, subtitle, share })
      }
    }
  } else if (type === 'scrape') {
    const { data } = await axios.get(`https://www.stafaband123.co/music/${query.replace(/\s/g, '-')}.html`)
    const $ = await cheerio.load(data)
    await $('div.kananku > div.wkwk').each(async function () {
      const musicContent = await cheerio.load($(this).html())
      const musicTitle = musicContent('h4.title').text()
      const musicLink = `https://www.stafaband123.co/${musicContent('a.unduh').attr('href')}`
      const musicImg = musicContent('img.rounded').attr('src')
      tempDataMusic.push({ title: musicTitle, share: { href: musicLink, image: musicImg } })
    })
  } else {
    throw new Error('Metode tidak dikenali oleh sistem')
  }
  return res.json({ success: true, data: tempDataMusic, type })
})

module.exports = router