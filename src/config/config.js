import dotenv from "dotenv";

dotenv.config();

export const ENV = {
	PORT: process.env.PORT || 8080,
	DB_MONGO: process.env.DB_MONGO_ATLAS || 'mongodb://localhost:27017/ecommerce',
	SECRET_COOKIE: process.env.SECRET_COOKIE,
	SECRET_SESSION: process.env.SECRET_SESSION,
	TTL: process.env.TTL,
	GITHUB: {
		CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
	},
	CLOUDINARY: {
		CLOUD_NAME: process.env.CLOUD_NAME,
		API_KEY: process.env.API_KEY,
		API_SECRET: process.env.API_SECRET,
	},
};
