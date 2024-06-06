import { usersService } from "../feature/users/repository/users.service.js";

export const validateData = option => {
	if (option === "register") {
		return async (req, res, next) => {
			const user = req.body;
			if (
				!user.username ||
				!user.email ||
				!user.reemail ||
				!user.password ||
				!user.repassword
			) {
				res.status(400).json({ msg: "Faltan datos" });
			} else if (user.email !== user.reemail) {
				res.status(400).json({ msg: "Los correos no coinciden" });
			} else if (user.password !== user.repassword) {
				res.status(400).json({ msg: "Las contraseñas no coinciden" });
			} else if (await usersService.getByEmail(user.email)) {
				res.status(400).json({ msg: "El correo ya esta registrado" });
			} else {
				next();
			}
		};
	}
	if (option === "login") {
		return async (req, res, next) => {
			if (!req.body.email || !req.body.password) {
				res.status(400).json({ msg: "Faltan datos" });
			} else {
				next();
			}
		};
	}
};
