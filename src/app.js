import cors from "cors";
import express from "express";
import MongoStore from "connect-mongo";

import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./utils/utils.js";

import routesApi from "./feature/api.routes.js";
import routerViews from "./client/views.routes.js";

import { ENV } from "./config/config.js";

import { configMongoose } from "./config/db.config.js";
import { configPassport } from "./config/passport.config.js";
import { configHandebars } from "./config/hbs.config.js";
import { configSocketIo } from "./config/socket.config.js";

const app = express();
const httpServer = app.listen(ENV.PORT, () => {
	console.log(`Server on port http://localhost:${ENV.PORT}`);
});

// MIDDLAWARES
app.use(cors());
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
// MONGO
configMongoose(ENV.DB_MONGO);
// PASSPORT
configPassport(app);
// SOCKET IO
configSocketIo(httpServer);
// HANDLEBARS
configHandebars(app);

// ROUTES
app.use("/api/products", routesApi.products);
app.use("/api/messages", routesApi.users);
app.use("/api/carts", routesApi.carts);
app.use("/api/sessions", routesApi.messages);
app.use("/api/tickets", routesApi.tickets);

app.use("/", routerViews);

// // 404
app.use((req, res, next) => {
	try {
		res.status(404).render("404", { title: "404" });
	} catch (e) {
		console.error("Error al procesar la solicitud:", e);
		res.status(500).send({ error: "Error interno del servidor" });
	}
});
