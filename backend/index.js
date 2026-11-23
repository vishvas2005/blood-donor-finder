const express =  require('express');
const dotenv = require('dotenv');
const cors = require ('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config();
connectDB();
const app = express();
app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173" , credentials: true}))
app.use(express.json())
app.use(morgan("dev"))
const PORT = process.env.PORT || 3000;
//start coding from here please not remove health check route from here and kindly make folders according to need...






// this is the ending of code limit please maintain gaps //

app.get('/health-check', (req , res)=>{
   try{
    console.log("health is well");
    res.status(200).send("Port is ruuning there is not any problem");
   }catch(err){
    console.log("ohh bhai port langda hogya" , err);
    res.status(503).json({status :" down" , Message:"service unavialble"});
   }
})

app.listen(PORT , ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})