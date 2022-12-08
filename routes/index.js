const router = require('express').Router()
const Controller = require(`../controllers`)


const session = require('express-session')



router.get('/login',Controller.getLogin)
router.post('/login',Controller.postLogin)






router.get('/regpassword',Controller.regGetPassword)
router.post('/regpassword',Controller.regPostPassword)
router.use(function(req,res,next){
    // console.log(req.session);
    
    if(!req.session.userId){
        const error = 'Please Login First'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})
router.get(`/`, Controller.home)


router.get('/regprofile', Controller.regGetProfile)
router.post('/regprofile',Controller.regPostProfile)

router.get('/listpost', Controller.listPost)
router.get('/addpost', Controller.addPost)

module.exports = router