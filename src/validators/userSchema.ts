import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(2, "Username must be 2 character or more"),
    password: z.string().min(2).max(8, "Password must have at most 8 characters")
})

export const registerSchema = z.object({
    name: z.string().min(5, "Name must have atleast 5 character or more"),
    username: z.string().min(2, "Username must have at least 2 characters or more"),
    email : z.string().email("Please provide a valid email"),
    password: z.string().min(2).max(8, "Password must be at most 8 characters in length")
})