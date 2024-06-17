import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "production";
dotenv.config({
	path: `./.env.${environment}`,
});
const PORT = process.env.PORT_ASSIGNED || process.env.PORT;

export const ENV = {
	PORT,
	DB_MONGO: process.env.DB_MONGO,
	SECRET_COOKIE: process.env.SECRET_COOKIE,
	SECRET_SESSION: process.env.SECRET_SESSION,
	TTL: process.env.TTL,
	GITHUB: {
		CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
	},
	CLOUDINARY: {
		CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		API_KEY: process.env.CLOUDINARY_API_KEY,
		API_SECRET: process.env.CLOUDINARY_API_SECRET,
	},
	NODEMAILER: {
		USER: process.env.NODEMAILER_USER,
		KEY: process.env.NODEMAILER_KEY,
	},
};
