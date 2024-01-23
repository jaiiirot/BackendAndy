const express = require("express");
const routerProd = require("./src/routes/product.router");
const routerCart = require("./src/routes/cart.router");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/product", routerProd);
app.use("/api/carts", routerCart);

//Reglas
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.listen(8080, () => {
  console.log("Server on port 8080");
});
