import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	messages: [
		{
			role: {
				type: String,
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: String,
		validate: {
			validator: value => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			},
			message: value =>
				`${value} no es un formato de correo electrónico válido.`,
		},
		required: true,
	},
});

export const Messages = mongoose.model("message", messageSchema);
