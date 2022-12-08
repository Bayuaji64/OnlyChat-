const router = require('express').Router()
const Controller = require(`../controllers`)
const post = require('./post')
const profile = require('./profile')



router.get(`/`, Controller.home)
router.get('/regpassword',Controller.regGetPassword)
router.post('/regpassword',Controller.regPostPassword)
router.get('/regprofile', Controller.regGetProfile)
router.post('/regprofile',Controller.regPostProfile)

router.get('/listpost', Controller.listPost)
router.get('/addpost', Controller.addPost)

module.exports = router