import mongoose from "mongoose";

let isConnected = false

export async function connectDB(){
    
    if(isConnected) {
        console.log("connected")
        return
    }
    
    await mongoose.connect(process.env.DB_CONNECTION_STRING!)
    isConnected = true
}
