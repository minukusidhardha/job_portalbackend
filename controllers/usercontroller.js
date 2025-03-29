const bcrypt=require('bcryptjs');
const User = require('../models/user');
const jwt=require('jsonwebtoken');
const Admin = require('../models/admin');

exports.adduser=async (req,res)=>{
    try{
        let {name,city,username,password,cv,profilepic}=req.body;
        let salt=10;
        let hashcodded=await bcrypt.hash(password,salt);
        let userobj=new User({name,city,username,'password':hashcodded,cv,profilepic});
        userobj=await userobj.save();
        res.json(userobj);
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message});
    }

}

exports.login=async(req,res)=>{
   try{
      let {username,password}=req.body;

      let user=await User.findOne({'username':username});
      if(!user)
         res.status(400).json({'msg':'Invalid credencials'});
      let passwordpresent=await bcrypt.compare(password,user.password);
      if(!passwordpresent){
         res.status(400).json({'msg':'Invalid credencials'});
      }
      let secretkey='98765432108765';
      let object={
         'id':user._id,
         'username':user.username,
      }
      let token= jwt.sign(object,secretkey);
      res.json({'token':token});

   }
   catch(err){
      res.status(400).json({'msg':'something wrong '+err.message});
   }

}

exports.getalluser=async(req,res)=>{
   try{
      // console.log('hello')
      let obj=req.user;
      // console.log(obj)
      let username=obj.username;
      let admin=await Admin.findOne({'username':username});
      if (!admin)
         res.status(400).json({ 'msg': 'Unauthorized access' })
      let fetchdata = await User.find();
      res.json(fetchdata);

   }
   catch (err) {
      res.status(400).json({ 'msg': 'something wrong ' + err.message })
   }
}
exports.Getone=async(req,res)=>{
   try{
      // console.log('hello')
      let obj=req.user;
      // console.log(obj)
      let username=obj.username;
      let user=await User.findOne({'username':username});
      if (!user)
         res.status(400).json({ 'msg': 'Unauthorized access' })
      res.json(user);

   }
   catch (err) {
      res.status(400).json({ 'msg': 'something wrong ' + err.message })
   }
}
exports.Uploadprofile=async(req,res)=>{
   try{
      let obj=req.user;
      let username=obj.username;
      // console.log(obj)
      let user=await User.findOne({'username':username})
      if(!user)
         res.status(400).json({'msg':'UnAthorized'})
      let file=req.file;
      let filename=file.filename;
      let type=file.mimetype;
      user.profilepic=filename+'.'+type.split('/')[1]
      // console.log(profile)
      // user=new user({'profilepic':profile})
      user=await user.save(user);
      res.json(user)

   }
   catch(err){
      res.status(400).json({'msg':'something Wrong '+err})
   }
}
exports.Uploadcv=async(req,res)=>{
   try{
      let obj=req.user;
      let username=obj.username;
      // console.log(obj)
      let user=await User.findOne({'username':username})
      if(!user)
         res.status(400).json({'msg':'UnAthorized'})
      let file=req.file;
      let filename=file.filename;
      let type=file.mimetype.split('/')[1];
      console.log(type)
      let allowedtypes=['pdf','docx']
      if(allowedtypes.includes(type)){
         user.cv=filename+'.'+type;
         user=await user.save(user);
         res.json(user)
      }
      else{
          res.status(400).json({'msg':'Allowed types '+allowedtypes})
      }

   }
   catch(err){
      res.status(400).json({'msg':'something Wrong '+err})
   }
}