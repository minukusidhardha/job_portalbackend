const Job = require("../models/job");

exports.addjob=async(req,res)=>{
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
exports.getalljobs=async(req,res)=>{
    try{
        let fetchjobs=await Job.find();
        res.json(fetchjobs);
    }
    catch(err){
        res.status(400).json({'msg':'something wrong '+err.message})
    }

}