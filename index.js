// const math = require('./second')
// console.log(math.add(7,5));
// console.log(math.sub(5,3));

// Non-Blocking Architecture //
// const fs = require('fs')
// console.log("Before Function")
// fs.readFileSync('first.txt','utf-8',(err, data)=>{
//     console.log(err, data)    
//     console.log('Ok, Here It is Executed')    
// })
// console.log("After Function")

// Blocking Architecture //
// const fs = require('fs')
// console.log("Before Function")
// const log1 = fs.readFileSync('first.txt','utf-8')    
// console.log(log1)
// console.log("After Function")

// const fs = require('fs')
// console.log("Before Function")
// const log1 = fs.writeFileSync('first1.txt','Ok Will continue with next Session')    
// console.log(log1)
// console.log("After Function")

// const fs = require('fs')
// console.log("Before Function")
// fs.writeFile('first2.txt','Kal aana',(err, data)=>{
//     console.log(err, data)    
//     console.log('Ok, Here It is Executed')    
// })
// console.log("After Function")

// const http = require('http')
// const fs = require('fs')
// const url = require('url')
// const path = require('path')
// const myServer = http.createServer((req, res)=>{
//     // const log = `${new Date():$(req.url)}:requested\n`
//     const log = `${new Date()}:server has been requested on ${req.url}\n`
//     fs.appendFile('log.txt',log,()=>{})
//     console.log("Requested")
//     switch(req.url)
//     {
//         case '/':
//             if(req.method == 'GET')
//             {
//                 fs.readFile(path.join(__dirname,'index.html'),(err, content)=>{res.end(content)})
//             }
//             else if(req.method == 'POST')
//             {
//                 res.end('post method execution')
//             }
//             else if(res.method == 'PUT')
//             {
//                 res.end('put method execution')
//             }
//         case '/about':
//             res.end("Hii, I am Rudra")
//             break;
//         default:
//             res.end("404 Page is not Found")
//     }
// })
// myServer.listen(8001,()=>{console.log("Server Created")})

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./schema')
const passport = require('passport')
mongoose.connect('mongodb://127.0.0.1:27017/formData')
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>console.log("MongoDB connection error",err))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/public/index.html')
})
app.get('/about', (req, res) => {
    res.send("Welcome to About Page")
})
app.get('/register',
    passport.authenticate('local',{failureRedirect:'/login'}),(req, res) => {
    res.sendFile(__dirname+'/public/register.html')
})
app.get('/home', (req, res) => {
    res.send("Welcome to Home Page")
})
app.post("/register",(req,res)=>{
    const Newuser = new user({
        name : req.body.name,
        email : req.body.email,
        UserName:req.body.UserName,
        password:req.body.password
    });

    Newuser.save()
    .then(()=>{res.send("user saved successfully")})
    .catch(err=>res.status(500))
})
app.listen(8000,()=>{
    console.log('http://localhost:8000')
})