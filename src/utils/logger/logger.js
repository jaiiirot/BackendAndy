import winston, { format } from "winston";

const loggerconfig = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: "red",
		error: "magenta",
		warning: "yellow",
		info: "blue",
		http: "cyan",
		debug: "white",
	},
};
const level = process.env.NODE_ENV === "production" ? "debug" : "info";

export const logger = winston.createLogger({
	levels: loggerconfig.levels,
	transports: [
		new winston.transports.Console({
			level,
			format: winston.format.combine(
				winston.format.colorize({ colors: loggerconfig.colors }),
				winston.format.simple(),
				winston.format.errors({ stack: true })
			),
		}),

		new winston.transports.File({
			filename: "./errors.log",
			level: "warning",
			format: winston.format.combine(winston.format.timestamp(), format.json()),
		}),
	],
});

export const loggerServer = (req, res, next) => {
	req.logger = logger;
	req.logger.http(
		`🌐 ${req.method} - url: ${req.url}:${new Date().toISOString()}`
	);
	next();
};
