import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const ticketsSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		default: function () {
			return Math.random().toString(36).substring(2, 17).toUpperCase();
		},
	},
	purchase_datetime: {
		type: Date,
		default: Date.now,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
		required: true,
	},
});

ticketsSchema.plugin(paginate);
export const Tickets = mongoose.model("tickets", ticketsSchema);
