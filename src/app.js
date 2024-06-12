import express from "express";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./utils/utils.js";
import routesApiV1 from "./feature/api.routes.js";
import routesViews from "./client/views.routes.js";
import compression from "express-compression";
import { ENV } from "./config/config.js";
import { configSwagger } from "./config/swagger.config.js";
import { configMongoose } from "./config/db.config.js";
import { configPassport } from "./config/passport.config.js";
import { configHandebars } from "./config/hbs.config.js";
import { configSocketIo } from "./config/socket.config.js";
import { logger, loggerServer } from "./utils/logger/logger.js";

const app = express();
const httpServer = app.listen(ENV.PORT, () => {
	logger.info(`🟢 Servidor en http://localhost:${ENV.PORT}`);
});

// MIDDLAWARES
app.use(compression());
app.use(cors());
app.set("trust proxy", true);
app.use(loggerServer);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser(ENV.SECRET_COOKIE));
app.use(
	session({
		store: MongoStore.create({ mongoUrl: ENV.DB_MONGO, ttl: ENV.TTL }),
		secret: ENV.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
	})
);
configMongoose(ENV.DB_MONGO); // MONGO
configHandebars(app); // HANDLEBARS
configPassport(app, ENV); // PASSPORT
configSocketIo(httpServer, ENV); // SOCKET
configSwagger(app); // DOCS

// ROUTES
routesApiV1(app);
app.use("/", routesViews);

// 404
app.use((req, res, next) => {
	try {
		res.status(404).render("404", { title: "404" });
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
});
