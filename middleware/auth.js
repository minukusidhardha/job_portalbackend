const jwt=require('jsonwebtoken');
const auth=(req,res,callback)=>{
    try{
       const token=req.header('Authorization');
       if(!token)
        return res.status(400).json({ 'msg': 'No token given!!!' })
       let actualtoken=token.split(" ")[1];
       let seckretkey='98765432108765';
       let obj=jwt.verify(actualtoken,seckretkey);
       req.user=obj;
       callback();
    }
    catch(err){
        res.status(400).json({ 'err': err })
    }
}
module.exports=auth;