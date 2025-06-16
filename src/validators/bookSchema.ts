import { z } from "zod";

export const addBook = z.object({
    name:z.string().min(2, "Please provide a book name with more than 2 characters"),
    pages:z.number(),
    condition:z.enum(["old", "new", "refurbish"]),
    libraryId:z.string().min(2, "Please provide a real library Id")
})