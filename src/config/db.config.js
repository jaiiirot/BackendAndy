import mongoose from "mongoose";
import { logger } from "../utils/logger/logger.js";

export const configMongoose = url => {
	try {
		mongoose.connect(url);
	} catch (err) {
		logger.error(`❌ ${err.message}`);
		process.exit(1);
	}
	const dbConnection = mongoose.connection;
	dbConnection.once("open", _ => {
		logger.info(`🛢️ [ Database connected: ${url}`);
	});

	dbConnection.on("error", err => {
		logger.error(`❌ connection error: ${err}`);
	});
};
