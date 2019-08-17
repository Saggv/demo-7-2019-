const express = require("express");
const router = express.Router();
const userModel = require('../Model/User');
const auth = require('../Middleware/Auth');

router.get('/admin', auth, (req, res)=>{
        userModel.find({isAdmin: false})
                 .then(data =>{
                      res.json(data)
                 })
                 .catch( err =>{
                      res.json(err)
                 })
})

router.delete('/admin/removeuser/:id', auth, (req, res) =>{
       userModel.findByIdAndRemove({_id: req.params.id})
                .then( data=>{
                     res.json(data)
                })
                .catch( err=>{
                     res.json(err)
                })
})

module.exports = router;