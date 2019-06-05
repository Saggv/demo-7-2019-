const express = require("express");
const userModel = require('../Model/Users');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/resigter', (req, res)=>{
        const {name, email, password} = req.body;
        
        if( !name || !email ||!password){
             res.status(400).json({msg:"pleas enter all field"})
        }
        userModel.findOne({email})
                 .then( user =>{
                      if(user) return res.status(400).json({msg:"user already exits"});
                      const  newuser = new userModel({
                          name,
                          email,
                          password
                      });
                    bcrypt.genSalt( 10, (err, salt) =>{
                            bcrypt.hash(newuser.password, salt, (err,hash) =>{

                                  newuser.password = hash;
                                  newuser.save().then( user =>{
                                           jwt.sign( {id: user.id}, process.env.secretjwts, {expiresIn: 3600}, (err, token)=>{
                                                      if(err) throw err;
                                                      res.json({
                                                           token,
                                                           user: {
                                                                id: user.id,
                                                                name: user.name,
                                                                email: user.email,
                                                           }
                                                      })
                                           })
                                  })
                            })
                    })

                })

});

module.exports = router;