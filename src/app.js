const path = require('path')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
var cookieParser = require('cookie-parser')
const User = require('./models/user')
const userRouter = require('./router/user')

const cors = require('cors');
app.use(cors());
// const corsOptions = {
//   origin: "localhost:4200",
//   credentials: true,
// };
// const yourCustomCorsMw = cors(corsOptions);
// app.use(yourCustomCorsMw);
// app.options('*' ,yourCustomCorsMw);
// app.set('trust proxy', 1) 

// app.use(cors( {
//     origin: 'http://localhost:4200',
//     allowedHeaders: ['Content-Type', 'Authorization']
//     credentials: true
// } ));
// app.use(cors( {
//     origin: 'http://localhost:4200',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// } ));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({extended: false}))
app.use(cookieParser())
app.use('/',userRouter)

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
}) 