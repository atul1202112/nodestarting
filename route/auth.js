const express = require('express')
const router = express.Router()



const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post('/login' , async (req,res)=>{

         const user = await UserModel.findOne({email: req.body.email})
    if(!user)return res.send('invilade email');
    else{
        const passVerification = await bcrypt.compare(req.body.password,user.password)
        if (!passVerification) return res.send('invalide password');
        const token = jwt.sign({_id:user._id} , process.env.SECREET)
        user.password =undefined;
        res.json({
            body:{
                user: user,
                token: token
            }
        })
    }
})




module.exports = router