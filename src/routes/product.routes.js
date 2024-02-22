import upload from "../utils/upload.middleware.js";
import express from "express";
import ProductsDAO from "../dao/products/products.dao.js";
import fs from "fs";
import __dirname from "../utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let products;
  if (!!req.query.limit) {
    const limitProd = ProductsDAO.getAllWithLimit(parseInt(req.query.limit));
    limitProd.length > 0
      ? res.status(200).send(limitProd)
      : res.status(404).send({
          error: "No se encontraron productos con el límite especificado",
        });
  } else {
    products = await ProductsDAO.getAll();
    res.status(200).send(products);
  }
});

router.post("/", upload.array("photo", 4), async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const categorys = category.split(",");
  const product = {
    title,
    description: description.replace(/\n/g, `<br>`),
    code,
    price,
    stock,
    category: categorys,
    photo: req.files.map((file) => {
      return file.filename;
    }),
  };
  if (req.body) {
    await ProductsDAO.addProduct(product);
  } else {
    res
      .status(400)
      .send({ error: "No se pudieron obtener los datos del formulario" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).send({ msg: `Id no válido: ${req.params.id}` });
    await ProductsDAO.deleteProduct(req.params.id);
    res.status(200).redirect("/panel/productos");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});
router.delete("/", async (req, res) => {
  try {
    const IDS = req.body;
    if (!Array.isArray(IDS) || IDS.length === 0) {
      return res.status(400).send({ error: "IDs de productos no válidos" });
    }
    await ProductsDAO.deleteProducts(IDS);
    res.status(200).send({ msg: "Productos eliminados" });
  } catch (error) {
    console.error("Error al eliminar productos:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.put("/:id", upload.array("photos", 4), async (req, res) => {
  try {
    const product = await ProductsDAO.getById(req.params.id);
    let photos = [];
    if (req.files.length > 0) {
      product.photo.forEach(async (photo) => {
        const imagePath = `${__dirname}/public/image/products/${photo}`;
        await fs.promises.unlink(imagePath);
      });
      photos = req.files.map((file) => {
        return file.filename;
      });
    } else {
      photos = product.photo;
    }
    const { title, description, code, price, stock, category } = req.body;
    const categorys = category.split(",");
    const newProduct = {
      title,
      description: description.replace(/\n/g, `<br>`),
      code,
      price,
      stock,
      category: categorys,
      photo: photos,
    };
    await ProductsDAO.updateProduct(req.params.id, newProduct);
    res.status(200).send(newProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

export default router;
