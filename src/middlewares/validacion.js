import { usersService } from "../feature/users/repository/users.service.js";
import { productsService } from "../feature/products/repository/products.service.js";
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

export const validateProductData = method => {
	if (method === "createProduct" || method === "updateProduct") {
		return [
			body("title").notEmpty().withMessage("El título es obligatorio"),
			body("description")
				.notEmpty()
				.withMessage("La descripción es obligatoria"),
			body("code").notEmpty().withMessage("El código es obligatorio"),
			body("price")
				.isNumeric()
				.withMessage("El precio debe ser un número")
				.notEmpty()
				.withMessage("El precio es obligatorio"),
			body("status").isBoolean().withMessage("El estado debe ser un booleano"),
			body("promocion")
				.isBoolean()
				.withMessage("La promoción debe ser un booleano"),
			body("stock")
				.isNumeric()
				.withMessage("El stock debe ser un número")
				.notEmpty()
				.withMessage("El stock es obligatorio"),
			body("type").notEmpty().withMessage("El tipo es obligatorio"),
			body("genre").notEmpty().withMessage("El género es obligatorio"),
			body("category")
				.isArray()
				.withMessage("La categoría debe ser un array")
				.notEmpty()
				.withMessage("La categoría es obligatoria"),
			body("photo")
				.isArray({ max: 4 })
				.withMessage("La foto debe ser un array con un máximo de 4 elementos")
				.custom(value => value.every(item => typeof item === "string"))
				.withMessage("Cada foto debe ser una cadena de texto"),
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

				// Check for unique code in the case of creating a product
				if (method === "createProduct") {
					const producto = req.body;
					if (await productsService.getByCode(producto.code)) {
						return res
							.status(400)
							.json({ msg: "El código ya está registrado" });
					}
				}
				next();
			},
		];
	}
};
