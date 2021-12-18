const jwt = require('jsonwebtoken')
const User = require('../models/user')

// next is used in middlewares
// by the call of next the code below the next() 
// will execute after all the middleware functions are finsihed 
const auth = async(req,res, next) => {
    try{
        const token = req.cookies.Token
        console.log(token)
        if(token === undefined){
            console.log('Executing')
            next()
        }
        else{
        const decoded = jwt.verify(token, 'tokenkey')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        console.log(req.body)
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }
    }catch(e){
        res.status(401).send('Authentication failed')
    }
}

module.exports = auth


// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// const auth = async (req,res,next)=>{
//     // console.log('auth middleware')
//     // next()
//     try {
//         // const token = req.header('Authorization').replace('Bearer ', '')
//         console.log('xx',req.cookies.Token)
//         const token = req.cookies.Token
//         console.log('Token',token)
//         if(token === undefined){
//             console.log('Executing')
//             next()}
//         else{
//        // console.log('TOken',token)
//         const decoded = jwt.verify(token, 'tokenkey')
//       //  console.log('DECO',decoded)
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
//         console.log('User',user)
//       //  console.log('USER',user)
//      //   console.log(user)
//        //console.log("AUTH JS FILE")
//         if (!user) {
//             throw new Error()
//         }

//         req.token = token
//         req.user = user
//         next()}
//     } catch (e) {
//         console.log(e)
//         res.status(401).send({ error: 'Please authenticate.' })
//     }
// }

// module.exports = auth