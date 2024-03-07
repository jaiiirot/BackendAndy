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

router.post("/register", async (req, res) => {
	const user = req.body;
	try {
		const newUser = await UsersDAO.add(user);
		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error al registrar el usuario:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

router.post("/login", async (req, res) => {
	const user = req.body;
	try {
		const userLogged = await UsersDAO.login(user);
		if (userLogged) {
			res.status(200).json(userLogged);
		} else {
			res.status(401).json({ error: "Usuario o contraseña incorrectos" });
		}
	} catch (error) {
		console.error("Error al loguear el usuario:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const user = await UsersDAO.getById(id);
		res.status(200).json(user);
	} catch (error) {
		console.error("Error al obtener el usuario:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

export default router;
