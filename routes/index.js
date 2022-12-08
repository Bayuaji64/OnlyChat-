const router = require('express').Router()
const Controller = require(`../controllers`)
const post = require('./post')
const profile = require('./profile')


router.get(`/`, Controller.home)

router.use('/post',post)
router.use('/profile',profile)

module.exports = router