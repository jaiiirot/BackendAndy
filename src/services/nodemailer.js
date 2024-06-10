import nodemailer from "nodemailer";
import { ENV } from "../config/config.js";

const { USER, KEY } = ENV.NODEMAILER;
const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
	auth: {
		user: USER,
		pass: KEY,
	},
});

export const nodemailerService = {
	transporter,
};
