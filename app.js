const express = require('express')

const app = express()

const mongoose = require('mongoose')
const env = require('dotenv/config')

const port ='3000';
app.use(express.json())

const userrouter = require('./route/user')
app.use("/v1/" , userrouter)

const authrouter = require('./route/auth')
app.use("/auth/" , authrouter)


app.listen( port , ()=>{
    console.log("server is started at port " + port );
        
})

mongoose.connect(process.env.DB , { useNewUrlParser: true , useUnifiedTopology: true},()=>{
   
    console.log("database connecting ..... ");
    
   
})