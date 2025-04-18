const Applications = require("../models/apllication");
const Job = require("../models/job");
const User = require("../models/user");

exports.addapplication = async (req, res) => {
    try {
        const { jid, uid } = req.body;
        const job = await Job.findById(jid);
        if (!job)
            res.status(400).json({ 'msg': 'Invalid user ID' });
        const user = await User.findById(uid);
        if (!user)
            res.status(400).json({ 'msg': 'Invalid job ID' });
        let applicationobj = new Applications({ 'job': jid, 'user': uid });
        applicationobj = await applicationobj.save();
        res.json(applicationobj);
    }

    catch (err) {
        res.status(400).json({ 'msg': 'something wrong ' + err.message })
    }
}
exports.Assignedjobtouser=async(req,res)=>{
    try{
        let obj=req.user;
        let username=obj.username;
        let uid=obj.id;
        let user=await User.findOne({'username':username})
        if(!user)
            res.status(400).json({'msg':'Invalid data!!!'})

        let assign=await Applications.findOne({'user':uid}).populate('job')
        assign=[assign].map(a => a.job)
        res.json(assign);
    }
    catch(err){
        re.status(400).json({'msg':'something wrong '+err})
        
    }

}