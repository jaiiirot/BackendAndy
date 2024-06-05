import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const tiketsSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		default: function () {
			return Math.random().toString(36).substring(2, 10).toUpperCase();
		},
	},
	purchase_datatime: { type: Date.now, required: true },
	amount: { type: Number, required: true },
	purchaser: { type: String, required: true },
});

tiketsSchema.plugin(paginate);
export const Tikets = mongoose.model("tikets", tiketsSchema);
