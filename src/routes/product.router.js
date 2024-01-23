const managerProduct = require("../controllers/ManagerProduct");
const Router = require("express");
const router = Router();

router.get("/", (req, res) => {
  if (!req.query.limit) {
    const products = managerProduct.getProducts();
    res.status(200).send(products);
  } else {
    const limitProd = managerProduct.getLimitProducts(
      parseInt(req.query.limit)
    );

    limitProd.length > 0
      ? res.status(200).send(limitProd)
      : res.status(404).send({
          error: "No se encontraron productos con el límite especificado",
        });
  }
});

router.post("/add", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  if (
    !title ||
    !description ||
    !code ||
    price === undefined ||
    status === undefined ||
    stock === undefined ||
    !category ||
    !thumbnails
  ) {
    res.status(400).send({ error: "Faltan datos" });
  }
  const newProduct = managerProduct.addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  res.status(201).send(newProduct);
});

router.get("/:id", (req, res) => {
  if (!isNaN(req.params.id)) {
    const product = managerProduct.getProductsById(productId);
    product
      ? res.status(200).send(product)
      : res.status(404).send({ error: "Producto no encontrado." });
  } else {
    res.status(400).send({ error: "ID de producto no válido" });
  }
});

router.delete("/delete/:id", (req, res) => {
  if (!isNaN(req.params.id)) {
    const product = managerProduct.deleteProduct(parseInt(req.params.id));
    product
      ? res.status(404).send({ error: "Producto no encontrado" })
      : res.status(200).send(product);
  } else {
    res.status(400).send({ error: "ID de producto no válido" });
  }
});

router.put("/update/:id", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  if (
    !title ||
    !description ||
    !code ||
    price === undefined ||
    status === undefined ||
    stock === undefined ||
    !category ||
    !thumbnails
  ) {
    res.status(400).send({ error: "Faltan datos" });
  }
  if (!isNaN(req.params.id)) {
    const product = managerProduct.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    product
      ? res.status(200).send(product)
      : res.status(404).send({ error: "Producto no encontrado" });
  } else {
    res.status(400).send({ error: "ID de producto no válido" });
  }
});

module.exports = router;
