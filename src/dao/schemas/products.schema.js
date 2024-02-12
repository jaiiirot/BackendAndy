import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: Array,
  photo: Array,
});

// Definir un modelo
export const Products = mongoose.model("products", productsSchema);
