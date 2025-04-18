const express=require('express');
const { adduser, getalluser, login, Uploadprofile, Uploadcv, Getone } = require('../controllers/usercontroller');
const auth = require('../middleware/auth');
const multer = require('multer');
const os = require('os');
const path1=require('path')
// let upload = multers({ dest: path1.join(os.tmpdir(), 'profile/') });
// let upload1 = multers({ dest: path1.join(os.tmpdir(), 'cv/') });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/user/OneDrive/Desktop/hexaware/jobportalui/public/cv/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload1 = multer({ storage: storage })

  const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/user/OneDrive/Desktop/hexaware/jobportalui/public/profile/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage1 })
const urouter=express.Router();
urouter.post('/add',adduser)
urouter.post('/login',login)
urouter.get('/get',auth,getalluser)
urouter.get('/getone',auth,Getone)
urouter.put('/profile',auth,upload.single('file'),Uploadprofile);
urouter.put('/cv',auth,upload1.single('file'),Uploadcv);
module.exports=urouter;