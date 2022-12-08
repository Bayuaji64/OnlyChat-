class Controller{
    	static home(req, res){
            res.render('login')
        }
        static regProfile(req, res){
            res.render('regProfile')
        }
        static regPassword(req, res){
            res.render('regpassword')
        }
}
module.exports = Controller