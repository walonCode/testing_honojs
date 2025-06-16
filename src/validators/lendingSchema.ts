import { z } from "zod";

// Lending schema validation
export const lendingSchema = z.object({
  bookId: z.string().min(1),
  userId: z.string().min(1),
  username: z.string().min(1),
  timeBorrowed: z.string().datetime(),
  timeReturned: z.string().datetime()
});