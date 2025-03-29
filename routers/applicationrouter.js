const express=require('express');
const { addapplication, Assignedjobtouser } = require('../controllers/applicationcontrol');
const auth = require('../middleware/auth');
const arouter=express.Router();
arouter.post('/add',addapplication);
arouter.get('/get',auth,Assignedjobtouser);
module.exports=arouter;