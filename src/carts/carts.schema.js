import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
	products: {
		type: [
			{
				pid: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "products",
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		default: [],
	},
});

// Definir un modelo
export const Carts = mongoose.model("carts", cartsSchema);
