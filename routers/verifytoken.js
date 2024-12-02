const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req,res,next)=>{

    const token = req.headers['x-auth-token'];

    jwt.verify(token, process.env.JWT_SECRET, (err,payload)=>{

        if(err){
            res.status(403).json({error: 'unauthorised user access'});
        }else{
            req.user= payload;
            next()
        }
    })

    
}

module.exports = verifyToken