import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import UsersDAO from "../dao/users/users.dao.js";
import { hashPassword, comparePassword } from "../config/crypt.js";

const router = Router();

router.post("/register", async (req, res) => {
	try {
		const user = req.body;
		console.log(user);
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
		} else if (await UsersDAO.getByEmail(user.email)) {
			res.status(400).json({ msg: "El correo ya esta registrado" });
		} else {
			const userLogged = await UsersDAO.postUser({
				username: user.username,
				email: user.email,
				password: hashPassword(user.password),
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
			const userLogged = await UsersDAO.getByEmail(req.body.email);
			if (userLogged && comparePassword(userLogged, req.body.password)) {
				// req.session.user = userLogged;
				// res.status(200).json({ msg: "Usuario logueado correctamente" });
				const token = jwt.sign({ id: userLogged._id }, "JhonJairoTumiri", {
					expiresIn: "1h",
				});
				console.log(token);
				res
					.cookie("jwt", token, {
						signed: true,
						httpOnly: true,
						maxAge: 1000 * 60 * 60,
					})
					.json({ status: 200, msg: "Usuario logueado correctamente" });
			} else {
				res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
			}
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
	}
});

router.get("/logout", (req, res) => {
	try {
		req.session.destroy();
		req.clearCookie("jwt");
		res.redirect("/");
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
});

router.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	async (req, res) => {}
);

router.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function (req, res) {
		req.session.user = req.user;
		console.log(req.user);
		res.redirect("/");
	}
);

router.post(
	"/auth/current",
	passport.authenticate("jwt", { session: false }),
	function (req, res) {
		res.json(req.user);
	}
);

export default router;
