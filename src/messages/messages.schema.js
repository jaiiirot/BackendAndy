import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	messages: {
		type: [
			{
				uid: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				message: {
					type: String,
					default: [],
				},
			},
		],
		default: [],
	},
});

export const Messages = mongoose.model("message", messageSchema);
