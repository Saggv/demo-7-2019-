const express = require('express');
const router = express.Router();
const ModelUser = require('../Model/User');
const auth= require('../Middleware/Auth');

router.post('/booking', auth, (req, res)=>{
        ModelUser.updateOne({_id:req.user.id}, {$push:{"asset":req.body}})
                 .then(res.status(200).json({msg:"update success !"}))
                 .catch( err => res.json("errore !@#!2"))
})
router.get('/booking',auth,(req, res)=>{
           ModelUser.findById(req.user.id).then( data=>res.json(data))
})

router.post('/booking/delete/:id',auth, (req, res) =>{
         ModelUser.update(
                   {_id: req.user.id},
                   { $pull:  { "asset": {"_id":req.params.id}}}
          ).then( data => res.json(data))
          .catch( err => res.json(err))

        
})
module.exports = router;