import mongoose, { Document, Schema } from "mongoose";
import { z } from 'zod';

interface ProductType extends Document {
    title: string;
    profile: string,
    cloudinary_id: string
}

const schema = new Schema<ProductType>({
    title: {
        type: String,
        require: true 
    },
    profile: {
        type: String,
        require: false,
      },
      cloudinary_id:{
        type: String,

      }
});

const Product = mongoose.model<ProductType>("Product", schema);

const Validate = z.object({
    title: z.string(),
});

export {
    Validate,
    Product
};
