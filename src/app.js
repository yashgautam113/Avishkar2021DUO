const path = require('path')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('./db/mongoose')
var cookieParser = require('cookie-parser')
const User = require('./models/user')
const userRouter = require('./router/user')
const http = require('http')
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

// Chat App

// const socketio = require('socket.io')

// const server = http.createServer(app)   //done by express itself but we are doint it seperately to use socket
// server.use(cors());
const server = app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

// const io = socketio(server) //configures socket.io with the server


// handle cors sepparately for socket
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
//runs when client connects
io.on('connection', (socket) => {   //socket: object whose methods will be used
    console.log('41 New webSocket Connection');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

// server.listen(4000,() =>{
//   console.log('chat server is up on 4000')
// })


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "PUT, POST, PATCH, DELETE, GET, OPTIONS"
//     );
//     return res.status(200).json({});
//   }
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.use(cookieParser())

app.use('/', userRouter)


// app.listen(3000, () =>{
//     console.log('Server is up on port 3000');
// }) 