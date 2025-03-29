const mongoose=require('mongoose');
const jobschema=mongoose.Schema({
    title:{type:String,required:true},
    shortdec:{type:String,required:true},
    salary:{type:Number,required:true},
    experience:{type:Number,required:true},
    techstack:{type:String,required:true},

})
const Job=mongoose.model("Job",jobschema);
module.exports=Job;