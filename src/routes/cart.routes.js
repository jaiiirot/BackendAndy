import CartsDAO from "../dao/carts/carts.dao.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartsDAO.getAll();
  res.status(200).send(carts);
});

router.get("/:cid", async (req, res) => {
  // console.log(req.params.cid);
  const cart = await CartsDAO.getByIdPopulate(req.params.cid);
  if (!cart) {
    res.status(404).send({ error: "Carrito no encontrado" });
    return;
  }
  res.status(200).send(cart);
});

router.post("/", (req, res) => {
  const newCart = CartsDAO.addCart(req.body);
  res.status(201).send(newCart);
});

router.post("/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  // console.log(cid, pid);
  if (cid && pid) {
    await CartsDAO.CartAddProduct(cid, pid);
  } else {
    res
      .status(400)
      .send({ error: "No se pudo agregar el producto al carrito" });
  }
});

router.put("/:cid", async (req, res) => {
  const updatedCart = await CartsDAO.updateCart(req.params.cid, req.body);
  if (!updatedCart) {
    res.status(404).send({ error: "Carrito no encontrado" });
    return;
  }
  res.status(200).send(updatedCart);
});

router.put("/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (cid && pid) {
    await CartsDAO.CartUpdateProduct(cid, pid, req.body);
  } else {
    res
      .status(400)
      .send({ error: "No se pudo actualizar el producto del carrito" });
  }
});

router.delete("/:cid", async (req, res) => {
  const deletedCart = await CartsDAO.deleteCart(req.params.cid);
  if (!deletedCart) {
    res.status(404).send({ error: "Carrito no encontrado" });
    return;
  }
  res.status(200).send(deletedCart);
});

router.delete("/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  if (cid && pid) {
    await CartsDAO.CartDeleteProduct(cid, pid);
  } else {
    res
      .status(400)
      .send({ error: "No se pudo eliminar el producto del carrito" });
  }
});

router

export default router;
