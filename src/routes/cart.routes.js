import CartsDAO from "../dao/carts/carts.dao.js";
import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const newCart = CartsDAO.addCart(req.body);
  res.status(201).send(newCart);
});

router.post("/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (cid && pid) {
    await CartsDAO.CartAddProduct(cid, pid);
  } else {
    res
      .status(400)
      .send({ error: "No se pudo agregar el producto al carrito" });
  }
});

router.get("/", async (req, res) => {
  const carts = await CartsDAO.getAll();
  res.status(200).send(carts);
});

router.get("/:cid", async (req, res) => {
  console.log(req.params.cid);
  const cart = await CartsDAO.getById(req.params.cid);
  if (!cart) {
    res.status(404).send({ error: "Carrito no encontrado" });
    return;
  }
  res.status(200).send(cart);
});

export default router;
