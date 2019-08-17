const express= require('express');
const ModelUser = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res)=>{
      const {email, password} = req.body;

      if( !email || !password){
           res.status(400).json({msg: 'Please enter all field !'})
      }
      ModelUser.findOne({email})
               .then( user=>{
                    if(!user) return res.status(400).json({msg:"User doesn't exits !"})

                    bcrypt.compare( password, user.password)
                          .then( isMatch => {
                                if( !isMatch ) return res.status(400).json({msg: "Password wrong !"});

                                jwt.sign( {id:user._id}, process.env.jsonwebtoken, {expiresIn: 3600}, (err, token)=>{
                                          if(err) throw err;
                                          res.json({
                                               token,
                                               user
                                          })
                                })
                          })
               })
});

module.exports = router;