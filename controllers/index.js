const {Profile, User,Post} = require('../models')
const bcrypt = require('bcryptjs')
const session = require('express-session')

class Controller{
    	static home(req, res){
            // .catch(err=> res.send(err))
            res.render('listPost')
        }
        static getLogin(req,res){
            const {error} =req.query
            res.render('login',{error})
        }
        
        static postLogin(req,res){
            // console.log(req.body);
            
            
            const {username,password}= req.body
    
            User.findOne({where: {username} })
            .then(user=>{
                // console.log(user);
                if(user){
                    const isValidPassword = bcrypt.compareSync(password,user.password)
                    // console.log(isValidPassword);
    
                    if(isValidPassword){
                        console.log(user);
                        req.session.userId = user.id
                       
                        return res.redirect('/')
                    } else{
                        const error = "invalid username/password"
                        return res.redirect(`/login?error=${error}`)
                    }
    
                } else{
                    const error = "Invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }
    
            })
            .catch(err=>{
                res.send(err)
            })
            
            
        }
        
        static regGetPassword(req, res){
            const errMsg = req.query.errMsg
            res.render('regPassword',{errMsg})
        }
        static regPostPassword(req, res){
            User.create(req.body)
            .then(_=>{
                res.redirect('/')
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

        static Add(req,res){
            Post.create(req.body)
            .then(()=>{
                res.redirect('listPost')
            })
            .catch(err=>{
                res.send(err)
            })

        }
        static addPost(req, res){
            res.render('addPost')
        }

        
}
module.exports = Controller



