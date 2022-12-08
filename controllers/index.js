const {Profile, User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller{
    	static home(req, res){
            const {error} =req.query
            // .catch(err=> res.send(err))
            res.render('login',{error})
        }
        
        static postLogin(req,res){
            
            
            const {username,password}= req.body
    
            User.findOne({where: {username} })
            .then(user=>{
                if(user){
                    const isValidPassword = bcrypt.compareSync(password,user.password)
    
                    if(isValidPassword){
                        return res.redirect('/listpost')
                    } else{
                        const error = "invalid username/password"
                        return res.redirect(`/?error=${error}`)
                    }
    
                } else{
                    const error = "Invalid username/password"
                    return res.redirect(`/?error=${error}`)
                }
    
            })
            
            
        }
        
        static regGetPassword(req, res){
            const errMsg = req.query.errMsg
            res.render('regPassword',{errMsg})
        }
        static regPostPassword(req, res){
            User.create(req.body)
            .then(_=>{
                res.redirect('listPost')
            })
            .catch(err=>{
                if(err.name ==='SequelizeValidationError'|| err.name === 'SequelizeUniqueConstraintError'){
                    const errMsg = err.errors.map(el=> el.message)
                    res.redirect(`/regpassword?errMsg=${errMsg}`)
                } else {
                    res.send(err)
                }
            })
        }
        static regGetProfile(req, res){
            const errMsg = req.query.errMsg
            res.render('regProfile', {errMsg})
        }
        static regPostProfile(req, res){
            const{ fullName,dateOfBirth,imgProfile, bio } = req.body
            Profile.create({fullName,dateOfBirth,imgProfile, bio})
            .then(_=> res.redirect('regPassword'))
            .catch(err=>{
                if(err.name ==='SequelizeValidationError'|| err.name === 'SequelizeUniqueConstraintError'){
                    const errMsg = err.errors.map(el=> el.message)
                    res.redirect(`/regprofile?errMsg=${errMsg}`)
                } else {
                    res.send(err)
                }
                

            }) 
        }

        static listPost(req, res){
            res.render('listPost')
        }
        static addPost(req, res){
            res.render('addPost')
        }
}
module.exports = Controller



