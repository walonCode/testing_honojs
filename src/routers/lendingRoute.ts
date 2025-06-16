import { Hono } from "hono";
import { createLending, getAllLendings, returnBook } from "../controllers/lendingController.js";

export const lendingRouter = new Hono()

lendingRouter.get('/', getAllLendings)
lendingRouter.post('/', createLending)
lendingRouter.patch("/:id", returnBook)