import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  currency: String,
  imgUrl: String,
  videoUrl: String,
  description: String,
  location: String,
  category: String,
  publisherId: String,
  status: String,
});

export const ProductModel = mongoose.model("Product", ProductSchema);
