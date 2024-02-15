
import bcrypt from "bcrypt"
import express, { Express, Request, Response } from 'express'
import { User, Validate } from '../models/user'
const router: Express = express()


router.post("", async (req: Request, res: Response) => {
    const valid = Validate.safeParse(req.body)
    if (!valid.success) return res.json(valid.error.errors[0])

    let users = await User.findOne({ email: req.body.email })
    if (users) return res.json("Emal already exist")

    users = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    const salt = await bcrypt.genSalt(10)
    users.password = await bcrypt.hash(users.password, salt)


    await users.save()

    res.json(users)
})

export default router