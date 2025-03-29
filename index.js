const express=require('express');
const dbconnect = require('./dbconfig');
const { json } = require('body-parser');
const jrouter = require('./routers/jobrouter');
const urouter = require('./routers/userrouter');
const router = require('./routers/adminrouter');
const arouter = require('./routers/applicationrouter');
const aurouter = require('./routers/authrouter');
const cors=require('cors')
const app=express();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  console.log('hello');
app.use(cors())
dbconnect();
app.use(express.json());
console.log('hii')
app.use('/api/jobs',jrouter);
app.use('/api/user',urouter);
app.use('/api/admin',router);
app.use('/api/application',arouter);
app.use('/api/auth',aurouter);
console.log('hii hello')
module.exports=app;