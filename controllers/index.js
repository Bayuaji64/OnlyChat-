const {Profile} = require('../models')

class Controller{
    	static home(req, res){
            res.render('login')
        }
        static regGetProfile(req, res){
            res.render('regProfile')
        }
        static regPostProfile(req, res){
            console.log(req.body)
        }
        static regPassword(req, res){
            res.render('regPassword')
        }
        static listPost(req, res){
            res.render('listPost')
        }
        static addPost(req, res){
            res.render('addPost')
        }
}
module.exports = Controller