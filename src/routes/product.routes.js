import express from "express";
import managerProduct from "../controllers/ManagerProduct.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.query.limit) {
    res.status(200).send(managerProduct.getProducts());
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

router.post("/", (req, res) => {
  const newProduct = managerProduct.addProduct(req.body);
  res.status(201).send(newProduct);
});

router.get("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
  const product = managerProduct.getProductsById(parseInt(req.params.id));
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Producto no encontrado." });
});

router.delete("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
  const product = managerProduct.deleteProduct(parseInt(req.params.id));
  product
    ? res.status(404).send({ error: "Producto no encontrado" })
    : res.status(200).send(product);
});

router.put("/:id", (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
  const product = managerProduct.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Producto no encontrado" });
});

export default router;
