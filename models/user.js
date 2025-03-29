const mongoose=require('mongoose');
const userschema=mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"User_Role"},
    cv:{type:String},
    profilepic:{type:String}
})
const User=mongoose.model("User",userschema);
module.exports=User;