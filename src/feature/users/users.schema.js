import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	photo_user: { type: String, required: false },
	first_name: { type: String, required: false },
	last_name: { type: String, required: false },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: false },
	age: { type: Number, required: false },
	cart: {
		cid: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
	},
	messages: {
		mid: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
	},
	role: { type: String, default: "CLIENT" },
	lastConnection: { type: Date, default: Date.now(), required: false },
	documents: {
		type: Array,
		name: { type: String, required: true },
		reference: { type: String, required: true },
		default: [],
	},
});

export const Users = mongoose.model("users", userSchema);
