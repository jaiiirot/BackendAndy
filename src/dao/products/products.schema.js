import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  promocion: { type: Boolean, default: false },
  stock: { type: Number, required: true },
  category: { type: Array, required: true },
  photo: {
    type: [{ type: String, required: true }],
    validate: {
      validator: function (arr) {
        return arr.length <= 4;
      },
      message: "Solo se permiten hasta 4 imágenes.",
    },
  },
});

productsSchema.plugin(paginate);

export const Products = mongoose.model("products", productsSchema);
