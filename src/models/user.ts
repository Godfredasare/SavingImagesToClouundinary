import mongoose from "mongoose"
import { z } from "zod"

interface UserType extends Document {
    username: string,
    email: string,
    password: string
}

const schema = new mongoose.Schema<UserType>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model<UserType>("Users", schema)

const Validate = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string()
})

export {
    User, Validate
}