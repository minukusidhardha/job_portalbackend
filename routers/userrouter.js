const express=require('express');
const { adduser, getalluser, login, Uploadprofile, Uploadcv, Getone } = require('../controllers/usercontroller');
const auth = require('../middleware/auth');
const multer = require('multer');
let upload=multer({dest:'C:/Users/user/OneDrive/Desktop/hexaware/jobportalui/public/profile/'})
let upload1=multer({dest:'C:/Users/user/OneDrive/Desktop/hexaware/jobportalui/public/cv/'})
const urouter=express.Router();
urouter.post('/add',adduser)
urouter.post('/login',login)
urouter.get('/get',auth,getalluser)
urouter.get('/getone',auth,Getone)
urouter.put('/profile',auth,upload.single('file'),Uploadprofile);
urouter.put('/cv',auth,upload1.single('file'),Uploadcv);
module.exports=urouter;