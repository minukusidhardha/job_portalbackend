const Admin = require("../models/admin");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const User = require("../models/user");
exports.Login=async(req,res)=>{
    const {username,password}=req.body;
    let admin=await Admin.findOne({'username':username})
    if(admin){
        let isValid=await bcrypt.compare(password,admin.password);
        if(!isValid){
            res.status(400).json({'msg':'Invalid Password'})
        }
        let seckret_key='98765432108765'
        let adminobj={
            'username':admin.username,
        }
        let token=jwt.sign(adminobj,seckret_key,{expiresIn:'24h'})
        res.json({
            'token':token,
            'role':admin.role
        })
    }
    let user=await User.findOne({'username':username})
    if(user){
        let isValid=await bcrypt.compare(password,user.password);
        if(!isValid){
            res.status(400).json({'msg':'Invalid Password'})
            res.json({success:false})
        }
        let seckret_key='98765432108765'
        let adminobj={
            'username':user.username,
            'id':user._id
        }
        let token=jwt.sign(adminobj,seckret_key,{expiresIn:'24h'})
        res.json({
            'token':token,
            'role':user.role
        })
    }
}
exports.resetpassword = async (req, res) => {
    try {
        console.log('inside')
        const { username, password } = req.body;
        // console.log(username,password)
        let admin = await Admin.findOne({ 'username': username })
        if (admin) {
            let isValid = await bcrypt.compare(password, admin.password);
            if (!isValid) {
                let salt=10;
                let hashpassword=await bcrypt.hash(password,salt)
                admin.password=hashpassword;
                let adding=await admin.save(admin);
                res.status(200).json(adding)
                
            }

        }
        let user = await User.findOne({ 'username': username })
        if (user) {
            let isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                console.log('hii')
                let salt=10;
                let hashpassword=await bcrypt.hash(password,salt)
                user.password=hashpassword;
                // let adding=new user(user)
                let adding=await user.save(user);
                res.status(200).json(adding)
            }
        }
    }
    catch (err) {
        res.status(400).json({ 'msg': 'something Wrong ' + err })
    }

}