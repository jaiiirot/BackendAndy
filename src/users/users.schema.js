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
	role: { type: String, default: "CLIENT" },
});

export const Users = mongoose.model("users", userSchema);
