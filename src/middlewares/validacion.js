// import { usersService } from "../feature/users/repository/users.service.js";
// import { param, validationResult } from "express-validator";

// export const validateData = option => {
// 	if (option === "register") {
// 		return async (req, res, next) => {
// 			const user = req.body;
// 			if (
// 				!user.username ||
// 				!user.email ||
// 				!user.reemail ||
// 				!user.password ||
// 				!user.repassword
// 			) {
// 				res.status(400).json({ msg: "Faltan datos" });
// 			} else if (user.email !== user.reemail) {
// 				res.status(400).json({ msg: "Los correos no coinciden" });
// 			} else if (user.password !== user.repassword) {
// 				res.status(400).json({ msg: "Las contraseñas no coinciden" });
// 			} else if (await usersService.getByEmail(user.email)) {
// 				res.status(400).json({ msg: "El correo ya esta registrado" });
// 			} else {
// 				next();
// 			}
// 		};
// 	}
// 	if (option === "login") {
// 		return async (req, res, next) => {
// 			if (!req.body.email || !req.body.password) {
// 				res.status(400).json({ msg: "Faltan datos" });
// 			} else {
// 				next();
// 			}
// 		};
// 	}
// };

import { usersService } from "../feature/users/repository/users.service.js";
import { body, validationResult } from "express-validator";

export const validateData = method => {
	if (method === "register") {
		return [
			body("username")
				.notEmpty()
				.withMessage("El nombre de usuario es obligatorio"),
			body("email").isEmail().withMessage("El correo electrónico no es válido"),
			body("reemail").custom((value, { req }) => {
				if (value !== req.body.email) {
					throw new Error("Los correos no coinciden");
				}
				return true;
			}),
			body("password").notEmpty().withMessage("La contraseña es obligatoria"),
			body("repassword").custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error("Las contraseñas no coinciden");
				}
				return true;
			}),
			async (req, res, next) => {
				const errores = validationResult(req);
				if (!errores.isEmpty()) {
					console.log(
						errores
							.array()
							.map(e => e.msg)
							.join("\n")
					);
					return res.status(400).json({
						msg: errores
							.array()
							.map(e => e.msg)
							.join("\n"),
					});
				}
				const usuario = req.body;
				if (await usersService.getByEmail(usuario.email)) {
					return res.status(400).json({ msg: "El correo ya está registrado" });
				}
				next();
			},
		];
	}
	if (method === "login") {
		return [
			body("email").isEmail().withMessage("El correo electrónico no es válido"),
			body("password").notEmpty().withMessage("La contraseña es obligatoria"),
			async (req, res, next) => {
				const errores = validationResult(req);
				if (!errores.isEmpty()) {
					return res.status(400).json({ errores: errores.array() });
				}
				next();
			},
		];
	}
};
