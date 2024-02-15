import express, { Express, Request, Response } from "express";
import { Product, Validate } from "../models/products";
import upload from "../utils/multer";
import cloudinary from "../utils/cloudinary";
const router: Express = express()



router.get('/', async (req: Request, res: Response) => {
    const product = await Product.find()
    res.json(product)
})

router.post('/', upload.single("image"), async (req: Request, res: Response) => {
    const valid = Validate.safeParse(req.body)
    if (!valid.success) return res.json(valid.error.errors[0])


    let transformation = [
        { width: 800, height: 600, crop: "limit" }, // Resize to fit within 800x600
        { quality: "auto", fetch_format: "auto" }   // Automatically adjust quality and format
    ]


    const result = await cloudinary.uploader.upload(req.file?.path as string, { eager: transformation })

    let product = new Product({
        title: req.body.title,
        profile: result.secure_url,
        cloudinary_id: result.public_id
    })
    await product.save()

    res.json(product)

})

router.delete("/:id", async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.json("ID not found")

    await cloudinary.uploader.destroy(product.cloudinary_id)
    res.json(product)
})

//updating

router.put("/:id", upload.single("image"), async (req: Request, res: Response) => {
    const valid = Validate.safeParse(req.body)
    if (!valid.success) return res.json(valid.error.errors[0])

    const product = await Product.findById(req.params.id)
    if (!product) return res.json("ID not found")

    await cloudinary.uploader.destroy(product.cloudinary_id)

    const result = await cloudinary.uploader.upload(req.file?.path as string)

    const updateDate = {
        title: req.body.title || product.title,
        profile: result.secure_url || product.profile,
        cloudinary_id: result.public_id || product.cloudinary_id
    }

    let products = await Product.findByIdAndUpdate(req.params.id, updateDate, { new: true })
    res.json(products)

})


export default router