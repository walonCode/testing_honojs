import {z} from "zod"


// ✅ Schema for validation
export const librarySchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  totalBook: z.number().min(0),
  availableBooks: z.number().min(0),
});