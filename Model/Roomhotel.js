const mongoose = require("mongoose");

const hotelroomSchema = new mongoose.Schema({
      name:{
          type: String,
          required: true
      },
      price:{
           type: Number,
           required: true
      },
      address:{
           type: String,
           required: true
      },
      image:{
        type: String,
        required: true
     },
     typeofroom:{
          type: String,
          required: true
     },
      date:{
           type: Date,
           default: Date.now
      }
});
const HotelroomModel = mongoose.model('HotelroomModel', hotelroomSchema, 'singleroom');

module.exports = HotelroomModel;