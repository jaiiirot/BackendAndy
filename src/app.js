import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerViews from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Server on port http://localhost:8080");
});

//MIDDLAWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//CONFIGURACIONES
const socketServer = new Server(httpServer);
app.set("views", `${__dirname}/views`);
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

//ROUTES
app.use("/", routerViews);
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);

//REGLAS
app.get("/ping", (req, res) => {
  res.send("Pong");
});

//404
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

//MONGOOSE
mongoose.connect("mongodb://localhost:27017/ecommerce");

//SOCKET IO
socketServer.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
});
