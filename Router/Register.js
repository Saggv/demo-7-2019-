const express = require('express');
const userModel = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();



router.post('/', (req, res) =>{
         const {name, email, password, asset} = req.body;

         if( !name || !email || !password){
                res.status(400).json({msg:"Please enter all field !"})
         }

         userModel.findOne({email})
              .then( user =>{
                      if(user) return res.status(400).json({msg:"user already exits !"});
                      const newUser = new userModel({
                             name,
                             email,
                             password,
                             asset
                      });
                      bcrypt.genSalt(10, ( err, salt) =>{
                             bcrypt.hash(newUser.password, salt, (err, hash)=>{
                                    newUser.password = hash;
                                    newUser.save()
                                          .then( user =>{
                                                  jwt.sign( {id: user.id}, process.env.jsonwebtoken, {expiresIn: 3600}, (err, token)=>{
                                                         if(err) throw err;
                                                         res.json({
                                                                token,
                                                                user:{
                                                                       id: user.id,
                                                                       name: user.name,
                                                                       email: user.email,
                                                                       asset: user.asset,
                                                                       isAdmin: user.isAdmin
                                                                }
                                                         })
                                                  } )
                                          })
                             })
                      })
              })
});

router.post('/:isAdmin', (req, res) =>{
       const {name, email, password, asset} = req.body;

       if( !name || !email || !password){
              res.status(400).json({msg:"Please enter all field !"})
       }

       userModel.findOne({email})
            .then( user =>{
                    if(user) return res.status(400).json({msg:"user already exits !"});
                    const newUser = new userModel({
                           name,
                           email,
                           password,
                           asset
                    });
                    newUser.isAdmin = req.params.isAdmin;
                    bcrypt.genSalt(10, ( err, salt) =>{
                           bcrypt.hash(newUser.password, salt, (err, hash)=>{
                                  newUser.password = hash;
                                  newUser.save()
                                        .then( user =>{
                                                jwt.sign( {id: user.id}, process.env.jsonwebtoken, {expiresIn: 3600}, (err, token)=>{
                                                       if(err) throw err;
                                                       res.json({
                                                              token,
                                                              user:{
                                                                     id: user.id,
                                                                     name: user.name,
                                                                     email: user.email,
                                                                     asset: user.asset,
                                                                     isAdmin: user.isAdmin
                                                              }
                                                       })
                                                } )
                                        })
                           })
                    })
            })
});

module.exports = router;