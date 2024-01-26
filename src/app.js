import express from "express";
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
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(`${__dirname}/public`));

//CONFIGURACIONES
const socketServer = new Server(httpServer);
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

//ROUTES
app.use("/", routerViews);
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);

//REGLAS
app.get("/ping", (req, res) => {
  res.send("Pong");
});

//SOCKET IO
socketServer.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
});
