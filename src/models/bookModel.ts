import { Schema, model, Document } from "mongoose";

interface Book extends Document{
    name:string,
    pages:number,
    condition:string,
    libraryId: string | undefined,
    isAvailable: boolean
}

const bookSchema = new Schema<Book>({
    name:{
        type:String,
        required: [true, "Please enter a valid book name"],
    },
    pages:{
        type:Number,
        required:true,
    },
    condition:{
        type:String,
        enum: ["new", "old", "refurbish"],
        unique:true
    },
    libraryId: {
        type:Schema.Types.ObjectId,
        required: true
    },
    isAvailable:{
        type:Boolean,
        default: true,
    }

}, { timestamps:true })

const Book = model("books", bookSchema)

export default Book