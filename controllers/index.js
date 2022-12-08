class Controller{
    	static home(req, res){
            res.render('login')
        }
        static regProfile(req, res){
            res.render('regProfile')
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