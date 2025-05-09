const express = require('express');
const router = express.Router();
const verifyToken = require('./verifytoken');
const Model  = require('../models/blogModel');
require('dotenv').config();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/add', verifyToken, (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

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

router.delete('/delete/:id', verifyToken, (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully", result });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error deleting blog", error: err });
    });
});


module.exports = router;