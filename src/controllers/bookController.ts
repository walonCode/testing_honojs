import Book from "../models/bookModel.js";
import type { Context } from "hono";
import { sanitizedObject } from "../utils/sanitizeHtml.js";
import { addBook } from "../validators/bookSchema.js";
import Library from "../models/libraryModel.js";


export async function createBook(c:Context){
    try{
        const reqBody = c.req.json()
        const result = addBook.safeParse(reqBody)
        if(!result.success){
            return c.json({
                ok:false,
                message:"invalid data sent"
            },400)
        }

        const sanitizedBody = sanitizedObject(result.data)
        const { name, pages, libraryId, condition } = sanitizedBody

        const book = await Book.findOne({ name })
        if(book){
            return c.json({
                ok:false,
                message:"Book alread exist",
            },409)
        }

        const library  = await Library.findOneAndUpdate({_id:libraryId},{$inc: {totalBook : 1, availableBook : 1}})
        if(!library){
            return c.json({
                ok:false,
                message:"invalid libraryId"
            },400)
        }

        const newBook = new Book({
            name,
            libraryId,
            pages,
            condition,
            isAvailable:true
        })

        //updating the books in that library the book was added
        //saving the new book
    

        await Promise.all([
            await library.save(),
            await newBook.save()
        ])

        

        return c.json({
            ok:true,
            message:"Book added"
        },201)

    }catch(err){
        console.log(err)
        return c.json({
            ok:false,
            message:"Internal server error",
        },500)
    }
}


export async function getAllBook(c:Context){
    try{
        const book = await Book.find({})
        if(book.length == 0){
            return c.json({
                ok:true,
                message:"No book available at yet"
            },200)
        }

        return c.json({
            ok:true,
            message:"books",
            data:book
        },200)
    }catch(err){
        console.log(err)
        return c.json({
            ok:false,
            message:"internal server error",
        },500)
    }
}


export async function deleteBook(c:Context){
    try{
        const id = c.req.param("id")
        if(!id){
            return c.json({
                ok:false,
                message:"no id provided",
            },400)
        }

        const book = await Book.findOne({ _id: id})

        const library = await Library.findOneAndUpdate({ _id:book?.libraryId}, { $inc : { totalBook: -1, availableBooks: -1 }})
        
        await library!.save()

        await book?.deleteOne()

        return c.json({
            ok:true,
            message:"Book deleted successfully",
        },200)

    }catch(err){
        console.log(err)
        return c.json({
            ok:false,
            message:"Internal server error"
        },500)
    }
}


export async function updateBook(c:Context){
    try{
        const id = c.req.param("id")
        if(!id){
            return c.json({
                ok:false,
                message:"please provide an id"
            },400)
        }

        const book = await Book.findByIdAndUpdate({ _id: id}, { isAvailable:false })
        const library = await Library.findByIdAndUpdate({_id:book?.libraryId}, { $inc : { borrowedBooks: 1, availableBooks: -1}})

        if(!book || !library){
            return c.json({
                ok:false,
                message:"invalid book id"
            },400)
        }

        await Promise.all([
            await book.save(),
            await library.save()
        ])

        return c.json({
            ok:true,
            message:"book borrowed successfully",
        },200)
    }catch(err){
        console.log(err)
        return c.json({
            ok:false,
            message:"internal server error",
        },500)
    }
}