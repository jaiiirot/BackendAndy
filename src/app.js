import express from "express";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import routerProd from "./routes/product.routes.js";
import routerUser from "./routes/user.routes.js";
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
const socket = new Server(httpServer);
app.set("views", `${__dirname}/views`);
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

//ROUTES
app.use("/", routerViews);
app.use("/api/products", routerProd);
app.use("/api/users", routerUser);
app.use("/api/carts", routerCart);

//REGLAS
app.get("/ping", (req, res) => {
  res.send("Pong");
});

//404
app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 || Palermo" });
});

//jhon@gmail.com --> contraseña: jhon --> admin
//MONGOOSE
mongoose.connect("mongodb://localhost:27017/ecommerce");
//MONGOOSE ATLAS
// mongoose.connect(
//   "mongodb+srv://ecommercedb:dbecommercedb@jairotecommerce.wwe0lxx.mongodb.net/ecommerce?retryWrites=true&w=majority"
// );

//SOCKET IO
let messages = [];
socket.on("connection", (io) => {
  console.log("New user connected");
  io.on("input_chat", (data) => {
    console.log(io);
    messages.push(data);
    socket.emit("container_chat", messages);
  });
});
