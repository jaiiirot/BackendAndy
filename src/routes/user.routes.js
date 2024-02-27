import { Router } from "express";
import UsersDAO from "../dao/users/users.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UsersDAO.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
});

export default router;
