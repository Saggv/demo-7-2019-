const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      name:{
           type: String,
           required: true
      },
      email:{
          type: String,
          required: true
      },
      password: {
           type: String,
           required: true
      },
      asset: {
           type: Array
      },
      date: {
          type: Date,
          default: Date.now
      },
      isAdmin:{
           type: Boolean,
           default: false
      }
});

const userModel = mongoose.model('userModel', userSchema, 'DataUser');

module.exports = userModel;





