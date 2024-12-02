const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifytoken');
const Model  = require('../models/blogModel')
require('dotenv').config()

router.post('/add',(req,res)=>{
    console.log(req.body);
    
    // res.send('response from userRouter')

    new Model(req.body).save()
    .then((result) => {
        res.json(result)

    }).catch((err) => {
        console.log(err);
        res.json(err)

    });
})

router.get('/getall',(req,res)=>{
    Model.find()
    .then((result)=>{
     res.status(200).json(result)
    })
    .catch((err)=>{
     console.log(err);
     res.status(500).json(err)
     
    })
 })

 router.get('/getbyid/:id',(req,res)=>{
    Model.findById(req.params.id)
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).json(err);  
    })
})

router.delete('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).json(err);  
    });
})


module.exports = router;