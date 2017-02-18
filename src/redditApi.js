// const Express = require('express')
import express from 'express'
import Snoowrap from 'snoowrap'

const router = express.Router()
const reddit = new Snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
})

router.get('/videos/hot', (req, res, next) => {
  reddit.getSubreddit('videos').getHot().then(listing => {
    res.send(JSON.stringify(listing))
    res.end()
  })
})

export default router
