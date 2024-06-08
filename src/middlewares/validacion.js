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
					return res.status(400).json({
						msg: errores
							.array()
							.map(e => e.msg)
							.join("\n"),
					});
				}
				next();
			},
		];
	}
};
