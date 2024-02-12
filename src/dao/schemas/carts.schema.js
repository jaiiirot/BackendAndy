import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: Array,
});

// Definir un modelo
export const Carts = mongoose.model("carts", cartsSchema);
