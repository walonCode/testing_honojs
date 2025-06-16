import mongoose from "mongoose";
import { config } from "dotenv";

config()

const DATABASE_URI = process.env.DATABASE_URI || ""


export default async function connnectDB(){
    console.log("MongoDB connection with retry")
    try{
        await mongoose.connect(DATABASE_URI, {
            dbName:"hono_test",
        })
        console.log("Database connected")
    }catch(err){
        console.log(err)
        setTimeout(()=> {
            connnectDB()
        },5000)
    }
}