import { Schema, model, Document } from "mongoose";

interface Library extends Document{
    name:string,
    location:string,
    totalBook:number,
    availableBooks:number,
    borrowedBooks: number
}

const librarySchema = new Schema<Library>({
    name:{
        type:String,
        required: [true, "Please enter a valid name"],
    },
    location:{
        type:String,
        required:true,
    },
    totalBook:{
        type:Number,
        required:true,
    },
    availableBooks:{
        type:Number,
        required:true,
    },
    borrowedBooks:{
        type:Number,
        default: 0,
    }

}, { timestamps:true })

const Library = model("librarys", librarySchema)

export default Library