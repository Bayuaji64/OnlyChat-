const router = require('express').Router()
const Controller = require(`../controllers`)
const post = require('./post')
const profile = require('./profile')



router.get(`/`, Controller.home)
router.get('/regprofile', Controller.regProfile)
router.get('/regpassword',Controller.regPassword)
router.get('/listpost', Controller.listPost)
router.get('/addpost', Controller.addPost)

module.exports = router