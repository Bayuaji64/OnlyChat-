const {Profile, User,Post} = require('../models')
const bcrypt = require('bcryptjs')
const session = require('express-session')

class Controller{
    static home(req, res){
            let data={}
            Post.findAll({
                include:{model:User},
                order:[
                    ['createdAt','DESC']
                ]
            })
            .then(dataPost =>{
                // console.log(dataPost);
                data.dataPost=dataPost
                return User.findByPk(req.params.id)
            })
            .then(dataUser=>{
                // console.log(dataUser);
                res.render('listPost',{...data,dataUser})
                
            })

            .catch(err => res.send(err))
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
                        // console.log(user);
                        req.session.userId = user.id
                       
                        return res.redirect(`/listPost/${user.id}`)
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
                res.redirect('/login')
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
            // console.log(req.params.id);
            User.findByPk(req.params.UserId)
            .then(dataUser =>{
                // console.log(dataUser);
                res.render('addPost',{dataUser})
            })
            .catch(err => res.send(err))
        }
        
        static add(req,res){
            const UserId = req.params.UserId;
            // console.log(UserId);
            // const img = req.file.path
            const { caption,img } = req.body
            Post.create({UserId ,caption, img})
            .then(()=>{
                res.redirect(`/listPost/${UserId}`)
            })
            .catch(err=>{
                res.send(err)
            })
        }
        static likeCount(req, res){
            Post.increment({likeCount:1},{where:{id:req.params.id}})
            .then(_=> res.redirect(`/listPost/${req.params.UserId}`))
            .catch(err => res.send(err))
        }
        static dislikeCount(req, res){
            Post.increment({dislikeCount:1},{where:{id:req.params.id}})
            .then(_=> res.redirect(`/listPost/${req.params.UserId}`))
            .catch(err => res.send(err))
        }
        static destroyById(req,res){
            Post.destroy({
                where:{
                    id: req.params.id
                }
            })
            .then(()=> res.redirect(`/listPost/${req.params.UserId}`))
            .catch(err=>res.send(err))
        }

        
}
module.exports = Controller



