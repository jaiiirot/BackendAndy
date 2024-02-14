import { Router } from "express";
import UsersDAO from "../dao/users.dao.js";

const router = Router();

// router.post("/", async (req, res) => {
//   console.log(req.body);
//   await usersDao.postUser(req.body);
//   if (user && user.password === password) {
//     res.status(200).json({ username: user.username });
//   } else {
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    if (
      !!req.body.data.email &&
      !!req.body.data.password &&
      req.body.type === "login"
    ) {
      const user = await UsersDAO.getByEmailAndPassword(req.body.data);
      if (!user) {
        res.status(401).json({ error: "Credenciales inválidas" });
      } else {
        res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", user: user });
      }
    } else if (req.body.type === "register") {
      const user = await UsersDAO.getByEmail(req.body.data.email);
      if (user) {
        res.status(401).json({ error: "El usuario ya existe" });
      } else {
        await UsersDAO.postUser(req.body.data);
        res.status(200).json({ message: "Usuario registrado exitosamente" });
      }
    }
  } catch (error) {
    console.error("Error al procesar la solicitud de inicio de sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
