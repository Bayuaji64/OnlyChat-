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
router.get(`/listpost/:id`, Controller.home)


router.get('/regprofile', Controller.regGetProfile)
router.post('/regprofile',Controller.regPostProfile)

router.get('/listpost/:UserId', Controller.listPost)
router.get('/addpost/:UserId', Controller.addPost)
router.post('/addpost/:UserId', Controller.add)
router.get('/listpost/:UserId/like/:id', Controller.likeCount)
router.get('/listpost/:UserId/postdislike/:id', Controller.dislikeCount)
router.get('/listpost/:UserId/delete/:id',Controller.destroyById)
module.exports = router