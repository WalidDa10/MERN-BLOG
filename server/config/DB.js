import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();



export default async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Successfuly");
    
} catch (error) {
    console.log("Connection failed To MongoDB" , error.message );
    
}
};