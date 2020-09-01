const express = require('express')

const router =express.Router()
const UserModel = require('../models/User')
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifytoken =require('./verifyjwt')
router.get('/index' , (req,res)=>{
 
    res.json({
        'body':{
            'message':'this is test api' ,
               
        }
    })
})

router.get('/token' ,(req ,res)=>{
    const token = jwt.sign({_id:'12312312'} , process.env.SECRET);
    res.send(token);
    console.log(token);
})






router.post("/add" ,async(req,res)=>{
        console.log('account verified')
        const schema=Joi.object({
            name: Joi.string().min(5).required(),
            email: Joi.string().min(5).email().required(),
            password: Joi.string().min(6).required()
        });
        const {error} = schema.validate(req.body);
        if (error) return res.send(error.details[0].message);
    else{
        const salt = await bcrypt.genSalt(10);
        const hasspwd =await bcrypt.hash(req.body.password , salt)

      const user = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: hasspwd
      })
      const save = await user.save()
      console.log('sent to database');
      try {
          res.send(save)
      } 
      catch (error) {
          res.send(error)
      }
    } 
    })



router.get('/all',verifytoken , async (req,res)=>{
    const users = await UserModel.find()
    try {
        res.send(users)
    } catch (error) 
    {
     res.send(error)   
    }
})

// router.get('/all', async (req,res)=>{
//     const users = await UserModel.find()
//     try {
//         res.send(users)
//     } catch (error) 
//     {
//      res.send(error)   
//     }
//  })
router.get('/user/:id', async (req,res)=>{
    const id = req.params.id;
    const users = await UserModel.findById(id)
    try {
        res.send(users)
    } 
    catch (error) 
    {
     res.send(error)   
    }
})

router.delete('/user/delet/email:email', async (req,res)=>{
        const email = req.params.email;
        const deleteduser = await UserModel.remove({
            email:email
        })


        try {
            res.send(deleteduser)
        } 
        catch (error) 
        {
        res.send(error)   
        }
})


router.delete('/user/delet/id:id', async (req,res)=>{
    const id = req.params.id;
    const deleteduserid = await UserModel.remove({
        _id:id
    })

    
    try {
        res.send(deleteduserid)
    } 
    catch (error) 
    {
     res.send(error)   
    }
})


router.patch('/update/:id' ,async (req,res)=>{
    const id =req.params.id;

    const update =await UserModel.update({
        _id:id
    },
    {
        $set: req.body
    })

    try {
        res.send(update)
    } 
    catch (error) 
    {
     res.send(error)   
    }


})

module.exports = router






