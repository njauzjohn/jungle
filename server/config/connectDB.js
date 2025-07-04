import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URL){
    throw new error(
        "please provide mongooDB"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("DB not Connected", error)
        process.exit(1)
    }
}

export default connectDB