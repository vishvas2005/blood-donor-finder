const mongoose = require("mongoose"); 

const connectDB = async () =>{
    try{
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log("mognosse connects with server without any problem");
    }catch(err){
      console.log('something went wrong in connection the root cause of error ->' , err);
      process.exit(1);
    }
}

module.exports= connectDB;