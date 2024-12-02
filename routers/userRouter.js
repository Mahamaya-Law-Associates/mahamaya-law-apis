const express = require('express');
const router = express.Router();
const Model = require('../models/userModel')
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifytoken');
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

router.put('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).json(err);  
    })

})


router.post('/authenticate',(req,res)=>{
    Model.findOne(req.body)
    .then((result) => {
        console.log(result);
        if(result){

            const {_id,email,password}= result;
            const payload = {_id,email,password};
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: 3600},
                (err,token)=>{
                    if(err){
                        console.log(err);
                        
                        res.status(500).json({message: 'token generated failed'});
                    }
                    else{
                        res.status(200).json({token: token});
                    }

                }

            )

        }
        else{
            res.status(401).json({message: "no user exist"})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
        
    });
})

module.exports = router;


