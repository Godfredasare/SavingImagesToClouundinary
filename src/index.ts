import "dotenv/config"
import compression from "compression"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import express, { Express } from 'express'
import mongoose from "mongoose"
const app: Express = express()
const PORT = process.env.PORT

import products from "./routes/products"
import user from "./routes/user"
import login from "./routes/login"



mongoose
    .connect(process.env.DATABASE_ENV as string)
    .then(() => console.log("mongodb is connected sucessfully"))
    .catch((e) => console.log("Error connecting to mongodb", e))

app.use(cors())
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use("/products", products)
app.use("/users", user)
app.use("/login", login)




app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));