const jwt = require("jsonwebtoken");
require('dotenv').config();
function auth(req, res, next){
     const token = req.header('token-ua');
     if(!token){
      return res.status(401).json({msg: "No token, authorizza denided"})
     }
     try{
           const decoded = jwt.verify(token, process.env.jsonwebtoken)
           req.user = decoded;
           next()
     }catch(e){
          res.status(400).json({msg:"token is not validat"})
     }
}

module.exports = auth;