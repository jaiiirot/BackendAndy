import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import routerProd from "./routes/product.routes.js";
import routerUser from "./routes/sessions.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerMessage from "./routes/message.routes.js";
import routerViews from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import passport from "./config/passport.js";

const DB_MONGO_LOCAL = "mongodb://localhost:27017/ecommerce";
const DB_MONGO_ATLAS =
	"mongodb+srv://ecommercedb:dbecommercedb@jairotecommerce.wwe0lxx.mongodb.net/ecommerce?retryWrites=true&w=majority";

const app = express();
const httpServer = app.listen(8080, () => {
	console.log("Server on port http://localhost:8080");
});

// MIDDLAWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser("JhonJairoTumiri"));
app.use(
	session({
		store: MongoStore.create({ mongoUrl: DB_MONGO_LOCAL, ttl: 200 }),
		secret: "secretCode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// CONFIGURACIONES
const socket = new Server(httpServer);
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

// jhon@gmail.com --> contraseña: jhon --> admin
// MONGOOSE
mongoose.connect(DB_MONGO_ATLAS);

// SOCKET IO
const messages = [];
socket.on("connection", io => {
	console.log("New user connected");
	io.on("input_chat", data => {
		console.log(io);
		messages.push(data);
		socket.emit("container_chat", messages);
	});
});
