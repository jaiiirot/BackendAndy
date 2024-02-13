import upload from "../utils/upload.middleware.js";
import express from "express";
import ProductsDAO from "../dao/products.dao.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", async (req, res) => {
  let products;
  if (!req.query.limit) {
    products = await ProductsDAO.getAll();
    res.status(200).send(products);
  } else {
    const limitProd = ProductsDAO.getAllWithLimit(parseInt(req.query.limit));
    limitProd.length > 0
      ? res.status(200).send(limitProd)
      : res.status(404).send({
          error: "No se encontraron productos con el límite especificado",
        });
  }
});

router.post("/", upload.array("photos", 4), async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const categorys = category.split(",");
  const product = {
    title,
    description,
    code,
    price,
    stock,
    category: categorys,
    photo: req.files.map((file) => {
      return file.filename;
    }),
  };
  if (req.body) {
    const newProduct = await ProductsDAO.addProduct(product);
    res.status(201).redirect("/panel/productos");
  } else {
    res
      .status(400)
      .send({ error: "No se pudieron obtener los datos del formulario" });
  }
});

// router.post("/", (req, res) => {
//   const newProduct = managerProduct.addProduct(req.body);
//   res.status(201).send(newProduct);
// });

// router.get("/:id", (req, res) => {
//   if (isNaN(req.params.id))
//     return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
//   const product = managerProduct.getProductsById(parseInt(req.params.id));
//   product
//     ? res.status(200).send(product)
//     : res.status(404).send({ error: "Producto no encontrado." });
// });

router.delete("/:id", async (req, res) => {
  if (!req.query.quantity) {
    const ids = JSON.stringify(req.body);
    console.log(ids);
    await ProductsDAO.deleteProducts(ids);
    res.redirect("/panel/productos");
  }
  if (!req.params.id) {
    console.log(req.params.id);
    const id = req.params.id;
    await ProductsDAO.deleteProduct(id);
    res.redirect("/panel/productos");
  }
  res.status(400).send({ error: "No se pudo eliminar el producto" });
});

// router.put("/:id", (req, res) => {
//   if (isNaN(req.params.id))
//     return res.status(400).send({ msg: `Id no valido: ${req.params.id}` });
//   const product = managerProduct.updateProduct(
//     parseInt(req.params.id),
//     req.body
//   );
//   product
//     ? res.status(200).send(product)
//     : res.status(404).send({ error: "Producto no encontrado" });
// });

export default router;
