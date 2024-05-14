import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils/utils.js";

import routerViews from "./client/views.routes.js";
import routerProd from "./products/products.routes.js";
import routerUser from "./users/sessions.routes.js";
import routerCart from "./carts/carts.routes.js";
import routerMessage from "./messages/messages.routes.js";

import passport from "./service/passport.js";
import { initialSocket } from "./service/socket.js";
import { ENV } from "./config/config.js";

const { PORT, DB_MONGO, SECRET_COOKIE, TTL, SECRET_SESSION } = ENV;
STARTAPP(PORT, DB_MONGO, SECRET_COOKIE, TTL, SECRET_SESSION);

function STARTAPP(PORT, DATABASE, SECRET_COOKIE, TTL, SECRET_SESSION) {
	const app = express();
	const httpServer = app.listen(PORT, () => {
		console.log("Server on port http://localhost:8080");
	});

	// MIDDLAWARES
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(`${__dirname}/public`));
	app.use(express.json());
	app.use(cors());
	app.use(cookieParser(SECRET_COOKIE));
	app.use(
		session({
			store: MongoStore.create({ mongoUrl: DATABASE, ttl: TTL }),
			secret: SECRET_SESSION,
			resave: true,
			saveUninitialized: true,
		})
	);
	app.use(passport.initialize());

	const socket = new Server(httpServer);
	initialSocket(socket);
	app.set("views", `${__dirname}/views`);
	app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
	app.set("view engine", ".hbs");

	// ROUTES
	app.use("/", routerViews);
	app.use("/api/products", routerProd);
	app.use("/api/messages", routerMessage);
	app.use("/api/carts", routerCart);
	app.use("/api/sessions", routerUser);

	// 404
	app.use((req, res, next) => {
		res.status(404).render("404", { title: "404 || Palermo" });
	});
	// MONGOOSE
	mongoose.connect(DATABASE);
}
