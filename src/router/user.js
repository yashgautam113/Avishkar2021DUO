const path = require('path')
const express = require('express')
// multer for file upload
const multer = require('multer')
const cookie = require('cookie')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
 
router.post('/signup',async(req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/edit',auth, async(req,res)=>{
   try{ 
       const user = req.user
    //    console.log('26', user)
    console.log('25',req.headers.token)
    user.first_name = req.body.first_name
    // console.log('27')
    user.last_name = req.body.last_name
    user.phone = req.body.phone
    user.latitude = req.body.latitude
    user.longitude = req.body.longitude
    user.gender = req.body.gender
    user.bio = req.body.bio 
    await req.user.save()

    res.json(user)
    console.log('DONE')
   }catch(e){
       console.log(e)
    res.status(400).send()
   }
})

router.post('/login', async(req, res) => {7
    try{
        // verification
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if(user){
            // giving token
        const token = await user.generateAuthToken()
        // creating cookie 
        res.cookie('Token', token, {maxAge: 50000, httpOnly: true, secure: false})
        console.log('Cookie')
        res.json({user ,email:user.email, token});
        }
    }catch(e){ 
        res.status(400).send()
    }
}) 


router.post('/logout', auth , async(req,res)=> {
    try { 
        console.log('LOGOUT',req.cookies.Token)
        req.user.tokens = req.user.tokens.filter((token) => {
            res.clearCookie('Token')
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// profile picture
const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    // cb stands for call back
    fileFilter(req, file, cb){
         // if(!file.originalname.endsWith('.jpg'))
        // match fn matches regular expression
        if(!file.originalname.match(/\.(jpg)$/)) {
            return cb(new Error('Please upload a JPG file'))
        }
        // cb(new Error('File must be a pdf'))
        cb(undefined, true)
        // cb(underfined, false)
    }
})
router.post('/avatar',auth,  upload.single('avatar'), async(req,res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(500).send()
    // ({error : error.message})
}) 

// Deleting Profile picture
router.delete('/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/:id/avatar', async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        // Setting header
        // res.set('Content-Type', 'image/jpeg')
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})



module.exports = router