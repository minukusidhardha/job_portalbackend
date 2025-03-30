const express=require('express');
const { addjob, getalljobs } = require('../controllers/jobcontroller');
const jrouter=express.Router();
console.log('hemanth')
jrouter.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.originalUrl}`);
    next(); // Pass control to the next route handler
});
jrouter.post('/add',addjob);
jrouter.get('/get',getalljobs);
// jrouter.post('/add',(req,res)=>{addjob});
// jrouter.get('/get',(req,res)=>{getalljobs});
module.exports=jrouter;