import { Hono } from "hono";
import { createBook, deleteBook, getAllBook, updateBook } from "../controllers/bookController.js";

export const bookRouter = new Hono()

bookRouter.get("/", getAllBook)
bookRouter.post('/', createBook)
bookRouter.patch('/:id', updateBook)
bookRouter.delete("/:id", deleteBook)
