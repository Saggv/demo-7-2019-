const express = require("express");
const router = express.Router();
const AssetModel = require('../Model/Asset');
const auth = require('../Middleware/Auth');


router.post('/', auth, (req, res)=>{
       const newAsset = new AssetModel({
            name: req.body.name,
            price:req.body.price,
            description: parseInt(req.body.description),
            image:req.body.image,
            speed: req.body.speed,
            capacity: req.body.capacity,
            maxspeed: req.body.maxspeed,
            mass: req.body.mass,
            manufacture: req.body.manufacture
       })
       newAsset.save().then( item => res.json(item))
});

router.get('/', (req, res)=>{
      AssetModel.find().then( item => res.json(item));
})

router.delete('/delete/:id', (req, res)=>{
       AssetModel.findByIdAndRemove(req.params.id).then( data => res.json(data))
})

module.exports = router;