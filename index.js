const express=require('express');
const dbconnect = require('./dbconfig');
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
app.use(cors());
dbconnect();
console.log('hello');
app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Welcome to the job API!');
// });
app.use('/api/jobs',jrouter);
app.use('/api/user',urouter);
app.use('/api/admin',router);
app.use('/api/application',arouter);
app.use('/api/auth',aurouter);
const port = process.env.PORT || 5001;  // Vercel assigns the port dynamically
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = (req, res) => {
  return app(req, res); // This will handle the serverless function response
};