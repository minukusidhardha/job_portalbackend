const express=require('express');
const { Login, resetpassword } = require('../controllers/authcontroller');
const aurouter=express.Router()
aurouter.post('/login',Login)
aurouter.post('/setpassword',resetpassword);
module.exports=aurouter;