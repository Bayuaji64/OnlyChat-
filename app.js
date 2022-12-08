const express = require('express')
const app = express()
const port = 3000
const router = require(`./routes`)
const session = require('express-session')
const multer = require('multer')
const { DATE } = require('sequelize')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

const fileStorage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().getTime()+'-'+file.originalname)
  }
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpg'|| file.mimetype === 'image/png'){
    cb(null,true)
  } else{
    cb(null,false)
  }
}

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('img'))

app.use(session({
  secret: 'Rahasiaaa',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite:true
   }
}))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})