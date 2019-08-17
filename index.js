const express = require("express");
const mongoose = require("mongoose");

// require Router
const Register = require('./Router/Register');
const Login = require('./Router/Login');
const HotelRomm = require('./Router/HotelRoom');
const Booking = require('./Router/Booking');
const Admin = require('./Router/Admin');

//connnect to mongoose
mongoose.connect('mongodb://localhost/hotel',{ useNewUrlParser: true },()=>{
      console.log("connect to mongodb success")
})
mongoose.set('useCreateIndex', true);

const app = express();

const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', HotelRomm);
app.use('/register', Register);
app.use('/login', Login);
app.use('/', Booking);
app.use('/', Admin)

const port = process.env.PORT || 7000;
app.listen( port, ()=> console.log(`Server run on port ${port}`));