const mongoose = require('mongoose');

let isConnected = false; // Track the connection status

async function dbconnect() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const dbURI = process.env.DB_URL;
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

module.exports = dbconnect;
// const mongoose=require('mongoose');
// async function dbconnect() {
//     try {
//         // Use the environment variable for the connection string
//         const dbURI = process.env.DB_URI;
//         if (!dbURI) {
//           throw new Error('DB_URI environment variable is not set');
//         }
    
//         await mongoose.connect(dbURI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         });
    
//         console.log('DB connected');
//       } catch (err) {
//         console.error('Database connection error:', err);
//         throw err; // Ensure that errors are thrown and can be handled by Vercel
//       }
//     // try{
//     // await mongoose.connect('mongodb+srv://minukusidhardh:sidhu123@projectcluster1.y10st.mongodb.net/JobPortal?retryWrites=true&w=majority&appName=projectCluster1');
//     // console.log('DB connected')
//     // }
//     // catch(err){
//     //     console.log(err);
//     // }
    
// }
// module.exports=dbconnect;