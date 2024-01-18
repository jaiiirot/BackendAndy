const managerProduct = require("../ManagerProduct");
const Router = require("express");
const router = Router();

router.get("/", (req, res) => {
  managerProduct.putProducts();
  const limitProd = managerProduct.getLimitProducts(parseInt(req.query.limit));
  if (!limitProd) {
    const products = managerProduct.getProducts();
    res.send(products);
  } else {
    res.send(limitProd);
  }
});

router.post("/add", (req, res) => {
  res.send("Product");
});

router.get("/:id", (req, res) => {
  const product = managerProduct.getProductsById(parseInt(req.params.id));
  if (!product) {
    res.send({ error: "Producto no encontrado." });
  } else {
    res.send(product);
  }
});

module.exports = router;
