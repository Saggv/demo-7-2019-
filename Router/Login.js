const express = require('express');
const router = express.Router();
const userModel = require("../Model/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', (req, res)=>{
       const {email, password} = req.body;
       if(!email || !password){
              res.status(400).json({msg:" please enter all field"});
       }
       userModel.findOne({email}).then( user =>{
                    if(!user) return res.status(400).json({msg:"not fuound the user"});
                    bcrypt.compare( password, user.password).then( isMatch =>{
                            if(!isMatch) return res.status(400).json({msg:"Wrong password !"});

                            jwt.sign({id:user._id}, process.env.secretjwts, {expiresIn:3600}, (err, token)=>{
                                        if(err) throw err;
                                        res.json({
                                             token,
                                             user:{
                                                 id:user._id,
                                                 name:user.name,
                                                 email: user.email
                                             }
                                        })
                            })
                    })

       })

});

module.exports = router;