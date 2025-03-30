const express=require('express');
const { addapplication, Assignedjobtouser } = require('../controllers/applicationcontrol');
const auth = require('../middleware/auth');
const arouter=express.Router();
arouter.post('/add',addapplication);
arouter.get('/get',auth,Assignedjobtouser);
// arouter.post('/add',(req,res)=>{addapplication});
// arouter.get('/get',(req,res)=>{auth,Assignedjobtouser});
module.exports=arouter;