import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  }).then(()=>{
    console.log("Connected to MongoDB");
  }).catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
  })
}

export default connectDB;   

