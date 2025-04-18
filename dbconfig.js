
const mongoose=require('mongoose');
async function dbconnect() {
    try{
    await mongoose.connect('mongodb+srv://minukusidhardh:sidhu123@projectcluster1.y10st.mongodb.net/JobPortal?retryWrites=true&w=majority&appName=projectCluster1');
    console.log('DB connected')
    }
    catch(err){
        console.log(err);
    }
    
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const dbURI ='mongodb+srv://minukusidhardh:sidhu123@projectcluster1.y10st.mongodb.net/JobPortal?retryWrites=true&w=majority&appName=projectCluster1'; 
    // //process.env.DB_URL
    console.log(dbURI);
    if (!dbURI) {
      throw new Error('DB_URI environment variable is not set');
    }

    // Connect to MongoDB
    let connection=await mongoose.connect(dbURI);

    connection = true; // Mark as connected
    console.log('DB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
}
module.exports=dbconnect;