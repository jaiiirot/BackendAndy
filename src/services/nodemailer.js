import nodemailer from "nodemailer";
import { ENV } from "../config/config.js";
const { USER, KEY } = ENV.NODEMAILER;
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: USER,
		pass: KEY,
	},
});

const sendMail = async (to, subject, text, html) => {
	try {
		const info = await transporter.sendMail({
			from: `"Ilicito" <${USER}>`,
			to,
			subject,
			text,
			html,
		});
		return info;
	} catch (error) {
		console.error("Error: ", error);
		return error;
	}
};

export const nodemailerService = {
	sendMail,
};
