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
    // console.log('25',req.headers.token)
    user.first_name = req.body.first_name
    // console.log('27')
    user.last_name = req.body.last_name
    user.phone = req.body.phone
    user.latitude = req.body.latitude
    user.longitude = req.body.longitude
    user.gender = req.body.gender
    user.bio = req.body.bio 
    user.age = req.body.age
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
        // res.cookie('Token', token, {maxAge: 50000, httpOnly: true, secure: false})
        // console.log('55',user)
        res.json({user ,email:user.email, token});
        }
    }catch(e){ 
        res.status(400).send()
    }
}) 


router.post('/logout', auth , async(req,res)=> {
    console.log('65')
    try { 
        console.log('LOGOUT',req.user)
        req.user.tokens = req.user.tokens.filter((token) => {
            // res.clearCookie('Token')
            // console.log(token)
            return token.token !== req.headers.token
        })
        await req.user.save()
        // res.body = null
        // res.user = null;
        // console.log('73',res)
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/usersList',auth, async (req, res) => {
    try{
    const users = await User.find({});
    // console.log('85',users)
    // console.log('86', req.user)
    // const userMap = [];
    // users.forEach((user) => {
    //     userMap.push(user);
    // });
    
    res.send(users);
}catch(e){
    console.log('93',e)
}
}); 


router.get('/profile' , auth , async(req , res) => {
    try{
        user = req.user
        res.send(user)
    }catch(e){
        console.log('105',e)
    }
})

// profile picture
const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize: 100000000
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
    req.user.avatar = req.body.photo
    await req.user.save()
    console.log('131')
    res.send()
}, (error, req, res, next)=>{
    res.status(500).send()
    ({error : error.message})
}) 

// Deleting Profile picture
router.delete('/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/avatar',auth, async(req,res) =>{
    try{
        console.log('146',req.user.avatar)
        const user = req.user
        // Setting header
        // res.set('Content-Type', 'image/jpeg')
        res.set('Content-Type', 'image/jpg');
        console.log('150')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

// router.get('/users/:id/avatar', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         if (!user || !user.avatar) {
//             throw new Error()
//         }

//         res.set('Content-Type', 'image/jpg')
//         res.send(user.avatar)
//     } catch (e) {
//         res.status(404).send()
//     }
// })


router.post('/likes',auth, async(req,res)=>{
    try{
    const user = req.user
    user.likes.push(req.headers.id2);
    await req.user.save()
    res.json(user);
    }
    catch(e){
        console.log('157',e);
        res.status(404).send()
    }
})





module.exports = router