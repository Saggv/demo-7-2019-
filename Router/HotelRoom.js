const express = require("express");
const router = express.Router();
const RoomModel = require('../Model/Roomhotel');

router.post('/hotel', (req, res)=>{
      const newRoom = new RoomModel({
           name: req.body.name,
           price: req.body.price,
           image: req.body.image,
           typeofroom: req.body.typeofroom,
           address: req.body.address
      });
      newRoom.save().then( item =>res.json(item));
});

router.get('/hotel', (req, res)=>{
        RoomModel.find().then( data=> res.json(data));
})

router.delete('/hotel/delete/:id', (req, res)=>{
          RoomModel.findByIdAndDelete(req.params.id).then( data=> res.json(data));
})
module.exports = router;