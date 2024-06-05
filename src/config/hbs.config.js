import handlebars from "express-handlebars";
import __dirname from "../utils/utils.js";

export const configHandebars = app => {
	app.set("views", `${__dirname}/views`);
	app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
	app.set("view engine", ".hbs");
};
