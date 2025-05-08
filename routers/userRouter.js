const express = require('express');
const router = express.Router();
const Model = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./verifytoken');
require('dotenv').config()

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/add', async (req,res)=>{
    
    // res.send('response from userRouter')

    try {
        // Encrypt the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Replace the plain text password with the hashed password
        req.body.password = hashedPassword;

        const newUser = new Model(req.body);
        const result = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ result, token });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
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

router.post('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).json(err);  
    })

})


router.post('/authenticate', async (req,res)=>{
    try {
        const user = await Model.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { _id: user._id, email: user.email };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw res.status(401).json({ message: 'Unauthorized. Invalid token' });
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/verifytoken', verifyToken, (req, res) => {
    try {
        // If the token is valid, this route will be reached
        res.status(200).json({ message: 'Token is valid' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Token Invalid' });
    }
});

module.exports = router;


