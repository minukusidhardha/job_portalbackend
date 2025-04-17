
const mongoose=require('mongoose');
async function dbconnect() {
    
    try{
    await mongoose.connect('mongodb+srv://minukusidhardh:sidhu123@projectcluster1.y10st.mongodb.net/JobPortal?retryWrites=true&w=majority&appName=projectCluster1');
    console.log('DB connected')
    }
    catch(err){
        console.log(err);
    }
    
}
module.exports=dbconnect;