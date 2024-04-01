import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: false },
	admin: { type: Boolean, default: false },
});

export const Users = mongoose.model("users", userSchema);
