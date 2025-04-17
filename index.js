const express=require('express');
const dbconnect = require('./dbconfig');
const jrouter = require('./routers/jobrouter');
const urouter = require('./routers/userrouter');
const router = require('./routers/adminrouter');
const arouter = require('./routers/applicationrouter');
const aurouter = require('./routers/authrouter');
const cors=require('cors')
const app=express();
app.use(cors())
dbconnect();
app.use(express.json());
app.use('/api/jobs',jrouter);
app.use('/api/user',urouter);
app.use('/api/admin',router);
app.use('/api/application',arouter);
app.use('/api/auth',aurouter);
let PORT=process.env.PORT || 5001;
app.listen(PORT,()=>{console.log('port is listening')})