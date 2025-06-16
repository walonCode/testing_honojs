import { Schema, model, Document } from "mongoose";

interface User extends Document{
    name:string,
    email:string,
    username:string,
    password:string,
    borrowedBooks?: string[]
}

const userSchema = new Schema<User>({
    name:{
        type:String,
        required: [true, "Please enter a valid username"],
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    borrowedBooks: [{
        type:Schema.Types.ObjectId,
    }]

}, { timestamps:true })

const User = model("users", userSchema)

export default User