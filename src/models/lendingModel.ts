import { Schema, model, Document } from "mongoose";

interface Lending extends Document{
    bookName:string,
    libraryName:string,
    userId:string | undefined
    timeBorrowed:Date,
    timeReturned: Date
    username:string,
}

const lendingSchema = new Schema<Lending>({
    bookName:{
        type:String,
        required: [true, "Please enter a valid book name"],
    },
    libraryName:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    timeBorrowed:{
        type:Date,
        required:true,
    },
    timeReturned: {
        type:Date,
        required:true,
    },

}, { timestamps:true })

const Lending = model("lending", lendingSchema)

export default Lending