import { Hono } from "hono";
import { login, register } from "../controllers/authController.js";

export const authRouter = new Hono()

authRouter.get("/login",login)
authRouter.post("/register", register)