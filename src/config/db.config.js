import mongoose from "mongoose";
import { logger } from "../utils/logger/logger.js";

export const configMongoose = url => {
	try {
		mongoose.connect(url);
	} catch (err) {
		logger.warning(`⚠️ ${err.message}`);
		process.exit(1);
	}
	const dbConnection = mongoose.connection;
	dbConnection.once("open", _ => {
		logger.info(`🟢 Database connected`);
	});

	dbConnection.on("error", err => {
		logger.warning(`⚠️ connection error ${err}`);
	});
};
