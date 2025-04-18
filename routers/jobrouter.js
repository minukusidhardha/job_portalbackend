const express=require('express');
const { addjob, getalljobs } = require('../controllers/jobcontroller');
const jrouter=express.Router();
jrouter.post('/add',addjob);
jrouter.get('/get',getalljobs);
module.exports=jrouter;