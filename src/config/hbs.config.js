import handlebars from "express-handlebars";
import { logger } from "../utils/logger/logger.js";
import __dirname from "../utils/utils.js";

export const configHandebars = app => {
	try {
		app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
		app.set("views", `${__dirname}/views`);
		app.set("view engine", ".hbs");
	} catch (err) {
		logger.warning(`🔴 ${err.message}`);
		process.exit(1);
	}
};
