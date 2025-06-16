import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { Jwt } from "hono/utils/jwt";
import type { Context } from "hono";
import { loginSchema, registerSchema } from "../validators/userSchema.js";
import { sanitizedObject } from "../utils/sanitizeHtml.js";
import logger from "../utils/logger.js";

export async function register(c:Context){
    try{
        const reqBody = c.req.json()
        const result = registerSchema.safeParse(reqBody)

        if(!result.success){
            return c.json({
                ok: false,
                message:"Invalid "
            })
        }

        const sanitizedBody = sanitizedObject(result.data)
        const { name, username, password, email } = sanitizedBody

        const user = await User.findOne({ username })
        if(user){
            return c.json({
                ok:false,
                message:"User already exist"
            },409)
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            password:passwordHashed,
            email,
            name
        })

        await newUser.save()

        return c.json({
            ok:true,
            message:"user registered successfully"
        },201)

    }catch(err){
        console.log(err)
        return c.json({
            ok: false,
            message:"Internal server error",
        },500)
    }
}



export async function login(c: Context){
    try{
        const reqBody = c.req.json()
        const result = loginSchema.safeParse(reqBody)
        if(!result.success){
            return c.json({
                ok:false,
                message:"Invalid input data"
            }, 400)
        }

    

        const sanitizedBody = sanitizedObject(result.data)
        const { username, password } = sanitizedBody

        const user = await User.findOne({ username })
        if(!user){
            return c.json({
                ok:false,
                message:"Invalid email",
            },401)
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch){
            c.json({
                ok:false,
                message:"Invalid password"
            }, 401)
        }

        const accessToken = Jwt.sign({id:user._id, username:user.username, exp: 24 * 60 * 60}, process.env.JWT_SECRET!, 'HS256')

        await logger("auth.log","loginController",true, username, c?.req?.header("x-forwarder-for") as string, "")
        return c.json({
            ok:true,
            message:"User login successfull",
            data:{
                token:accessToken,
            }
        },200)
    }catch(err){
        console.log(err)
        return c.json({
            ok:false,
            message:"Internal server error",
        },500)
    }
}