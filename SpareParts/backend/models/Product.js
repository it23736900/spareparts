import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    category: String, // engine, mechanical, body, electronic...
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: String,
    images: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
