import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import __dirname from "../utils/utils.js";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Ilicito",
			version: "2.0.0",
			description: "API para el manejo de un sistema de ecommerce",
		},
	},
	apis: [`${__dirname}/docs/*.yaml`],
};
const specs = swaggerJsdoc(options);

export const configSwagger = app => {
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
