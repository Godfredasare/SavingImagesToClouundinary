
import bcrypt from "bcrypt"
import express, { Express, Request, Response } from 'express'
import { User } from '../models/user'
import { z } from "zod"
const router: Express = express()


router.post("", async (req: Request, res: Response) => {
    const valid = Validate.safeParse(req.body)
    if (!valid.success) return res.json(valid.error.errors[0])

    let users = await User.findOne({ email: req.body.email })
    if (!users) return res.json("Invalid email/password")



    const PasswordValid = await bcrypt.compare(req.body.password, users.password)
    if(!PasswordValid) return res.json("Invalid email/password")



    res.json("login")
})


const Validate = z.object({
    email: z.string().email(),
    password: z.string()
})

export default router