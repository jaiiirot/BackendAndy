const express = require("express");
const routerProd = require("./routes/product.router");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/product", routerProd);

//Reglas
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.listen(8080, () => {
  console.log("Server on port 8080");
});
