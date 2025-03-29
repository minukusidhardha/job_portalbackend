const mongoose=require('mongoose');
const applicationschema=mongoose.Schema({
    job:{type:mongoose.Types.ObjectId,ref:'Job',required:true},
    user:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    applieddate:{type:Date,default:Date.now}

})
const Applications=mongoose.model("Applications",applicationschema);
module.exports=Applications;