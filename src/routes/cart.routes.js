import CartsDAO from "../dao/carts/carts.dao.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartsDAO.getAll();
  res.status(200).send(carts);
});

router.post("/", (req, res) => {
  const newCart = managerCart.addCart();
  res.status(201).send(newCart);
});

export default router;
