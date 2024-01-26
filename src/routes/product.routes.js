import express from "express";
import managerProduct from "../controllers/ManagerProduct.js";
import { validationData, validationId } from "../middlewares/middleware.js";

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

router.post("/", validationData, (req, res) => {
  const newProduct = managerProduct.addProduct(req.body);
  res.status(201).send(newProduct);
});

router.get("/:id", validationId, (req, res) => {
  const product = managerProduct.getProductsById(parseInt(req.params.id));
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Producto no encontrado." });
});

router.delete("/:id", validationId, (req, res) => {
  const product = managerProduct.deleteProduct(parseInt(req.params.id));
  product
    ? res.status(404).send({ error: "Producto no encontrado" })
    : res.status(200).send(product);
});

router.put("/:id", validationId, validationData, (req, res) => {
  const product = managerProduct.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Producto no encontrado" });
});

export default router;
