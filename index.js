require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//require router
const Product = require('./Router/Product');
const Register = require('./Router/Register');
const Login = require('./Router/Login');
const Asset = require('./Router/Asset');

//connect with mongoose 
mongoose.connect(process.env.MongooseURL, { useNewUrlParser: true })

const app= express();




//body parser
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/', Product);
app.use('/', Register);
app.use('/', Login);
app.use('/asset', Asset);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const port = process.env.PORT || 7000;
app.listen( port, ()=>console.log(`Sever start on ${port}`))