const express=require('express');
const { Login, resetpassword } = require('../controllers/authcontroller');
const aurouter=express.Router()
aurouter.post('/login',Login)
aurouter.post('/setpassword',resetpassword);
// aurouter.post('/login',(req,res)=>{Login})
// aurouter.post('/setpassword',(req,res)=>{resetpassword});
module.exports=aurouter;