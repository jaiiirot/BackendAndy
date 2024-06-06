import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import session from "express-session";
import cookieParser from "cookie-parser";
import __dirname from "./utils/utils.js";

import routerViews from "./client/views.routes.js";
import routerProd from "./feature/products/products.routes.js";
import routerUser from "./feature/users/sessions.routes.js";
import routerCart from "./feature/carts/carts.routes.js";
import routerMessage from "./feature/messages/messages.routes.js";
import routerTicket from "./feature/tickets/tickets.routes.js";

import { ENV } from "./config/config.js";

import { configPassport } from "./config/passport.config.js";
import { configHandebars } from "./config/hbs.config.js";
import { configSocketIo } from "./config/socket.config.js";

const { PORT, DB_MONGO, SECRET_COOKIE, TTL, SECRET_SESSION } = ENV;
STARTAPP(PORT, DB_MONGO, SECRET_COOKIE, TTL, SECRET_SESSION);

function STARTAPP(PORT, DATABASE, SECRET_COOKIE, TTL, SECRET_SESSION) {
	const app = express();
	const httpServer = app.listen(PORT, () => {
		console.log("Server on port http://localhost:8080");
	});

	// MIDDLAWARES
	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(`${__dirname}/public`));
	app.use(express.json());
	app.use(cookieParser(SECRET_COOKIE));
	app.use(
		session({
			store: MongoStore.create({ mongoUrl: DATABASE, ttl: TTL }),
			secret: SECRET_SESSION,
			resave: true,
			saveUninitialized: true,
		})
	);
	mongoose.connect(DATABASE);
	// PASSPORT
	configPassport(app);
	// SOCKET IO
	configSocketIo(httpServer);
	// HANDLEBARS
	configHandebars(app);

	// ROUTES
	app.use("/api/products", routerProd);
	app.use("/api/messages", routerMessage);
	app.use("/api/carts", routerCart);
	app.use("/api/sessions", routerUser);
	app.use("/api/tickets", routerTicket);
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

	// MONGOOSE
}
