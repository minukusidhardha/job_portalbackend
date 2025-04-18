const Admin = require("../models/admin");
const Job = require("../models/job");
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Applications = require("../models/apllication");

exports.asignup=async(req,res)=>{
    try{
        let {username,password}=req.body;
        let salt=10;
        let hashcodded=await bcrypt.hash(password,salt);
        let adminobj=new Admin({'username':username,'password':hashcodded});
        adminobj=await adminobj.save();
        console.log('hii')
        return res.json(adminobj);
    }
    catch(err){
        return res.status(400).json({'msg':'something wrong '+err.message});
    }

}
exports.alogin=async(req,res)=>{
    try{
        let {username,password}=req.body;

        const admin=await Admin.findOne({'username':username});
        if(!admin)
            return req.status(200).json({'msg':'Invalid Credencials'});
        
        const passwordpresent=await bcrypt.compare(password,admin.password);
        if(!passwordpresent)
            return req.status(200).json({'msg':'Invalid Credencials'});

        let secretkey='98765432108765';
        let adminobject={
            'id':admin.username,
        }
        let token =await jwt.sign(adminobject,secretkey,{'expiresIn':'24h'});
        return res.json({'token ':token});
    }
    catch(err){
        res.status(200).json({'msg':'somthing wrong '+err.message});
    }

}
exports.addjobinadmin=async(req,res)=>{
    try{
    let{title,shortdec,salary,experience,techstack}=req.body;
    let jobobj=new Job({title,shortdec,salary,experience,techstack});
    jobobj=await jobobj.save();
    res.status(200).json(jobobj);
    }
    catch(err){
        res.status(400).json({'msg':'somthing wrong '+err.message});
    }
}   
exports.getalljobsinadmin=async(req,res)=>{
    try{
        let fetchjobs=await Job.find();
        res.json(fetchjobs);
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message})
    }

}
exports.alluserListing=async (req,res)=>{
    try{
        let {page,size}=req.query;
        page=parseInt(page)|| 1;
        size=parseInt(size) || 2;
        let skip=(page-1)*size;
        let data=await User.find().skip(skip).limit(size);
        let totalrecords=await User.countDocuments();
        let totalpages=Math.ceil(totalrecords/size);
        
    res.json(
        {
            'currentpage':page,
            'totalrecords':totalrecords,
            'data':data,
            'totalpages':totalpages
        });

    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message});
    }

}
exports.fetchbycity=async(req,res)=>{
    try{
        const city=req.params.city;
        let userfind=await User.find({'city':city})
        res.json(userfind);
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message});
    }

}
exports.fetchbyjobid=async(req,res)=>{
    try{
        const jid=req.params.jid;
        const userfind=await Applications.find({'job':jid}).populate("user");
        let fetmapping=userfind.map(a=>a.user)
        res.json(fetmapping);
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message});
    }

}
exports.fetchjobbyuser=async(req,res)=>{
    try{
        const uid=req.params.uid;
        console.log(uid)
        const application=await Applications.find({'user':uid}).populate("job");
        if(!application)
            res.status(400).json({'msg':'Invalid ID'})
        let appmapping=application.map(e=>e.job)
        //console.log(application)
        res.json(appmapping);
       
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message});
    }

}

