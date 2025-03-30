const express=require('express');
const { adduser, getalluser, login, Uploadprofile, Uploadcv, Getone } = require('../../controllers/usercontroller');
const auth = require('../../middleware/auth');
const multers = require('multer');
const os = require('os');
const path1=require('path')
let upload = multers({ dest: path1.join(os.tmpdir(), 'profile/') });
let upload1 = multers({ dest: path1.join(os.tmpdir(), 'cv/') });
const urouter=express.Router();
urouter.post('/add',adduser)
urouter.post('/login',login)
urouter.get('/get',auth,getalluser)
urouter.get('/getone',auth,Getone)
urouter.put('/profile',auth,upload.single('file'),Uploadprofile);
urouter.put('/cv',auth,upload1.single('file'),Uploadcv);
// urouter.post('/add',(req,res)=>{adduser})
// urouter.post('/login',(req,res)=>{login})
// urouter.get('/get',(req,res)=>{auth,getalluser})
// urouter.get('/getone',(req,res)=>{auth,Getone})
// urouter.put('/profile',(req,res)=>{auth,upload.single('file'),Uploadprofile});
// urouter.put('/cv',(req,res)=>{auth,upload1.single('file'),Uploadcv});
module.exports=urouter;