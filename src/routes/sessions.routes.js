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

router.post("/register", async (req, res) => {
	try {
		const user = req.body;
		console.log(user);
		if (user.email !== user.reemail) {
			res.status(400).json({ msg: "Los correos no coinciden" });
		} else if (user.password !== user.repassword) {
			res.status(400).json({ msg: "Las contraseñas no coinciden" });
		} else if (await UsersDAO.getByEmail(user.email)) {
			res.status(400).json({ msg: "El correo ya esta registrado" });
		} else {
			const userLogged = await UsersDAO.postUser({
				username: user.username,
				email: user.email,
				password: user.password,
			});
			if (userLogged) {
				res.status(200).json({ msg: " Se registro correctamente" });
			} else {
				res.status(400).json({ msg: "Error al registrar el usuario" });
			}
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
	}
});

router.post("/login", async (req, res) => {
	try {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ msg: "Faltan datos" });
		} else {
			const userLogged = await UsersDAO.getByEmailAndPassword(req.body);
			if (userLogged) {
				const dataUser = await UsersDAO.getById(userLogged._id);
				req.session.user = dataUser;
				res.status(200).json({ msg: "Usuario logueado correctamente" });
			} else {
				res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
			}
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
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
