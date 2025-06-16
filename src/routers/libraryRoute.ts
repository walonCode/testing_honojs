import { Hono } from "hono";
import { createLibrary, deleteLibrary, getAllLibraries, updateLibrary } from "../controllers/libraryController.js";

export const libraryRouter = new Hono()

libraryRouter.get('/', getAllLibraries)
libraryRouter.post('/', createLibrary)
libraryRouter.patch('/:id', updateLibrary)
libraryRouter.delete('/:id', deleteLibrary)