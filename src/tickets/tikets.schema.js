import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const tiketsSchema = new mongoose.Schema({
	code: { type: String, required: true, unique: true },
	purchase_datatime: { type: Date, required: true },
	amount: { type: Number, required: true },
	purchaser: { type: [] },
});

tiketsSchema.plugin(paginate);
export const Tikets = mongoose.model("tikets", tiketsSchema);
