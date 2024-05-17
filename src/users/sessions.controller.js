import jwt from "jsonwebtoken";
import UsersDAO from "./users.dao.js";
import UsersDTO from "./users.dto.js";
import { comparePassword } from "../service/crypt.js";
import { ENV } from "../config/config.js";
const { SECRET_COOKIE } = ENV;

const register = async (req, res) => {
	try {
		if (await UsersDTO.fromLocalRegister(req.body)) {
			res.status(200).json({ msg: " Se registro correctamente" });
		} else {
			res.status(400).json({ msg: "Error al registrar el usuario" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const login = async (req, res) => {
	try {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ msg: "Faltan datos" });
		} else {
			const userLogged = await UsersDAO.getByEmail(req.body.email);

			if (userLogged && comparePassword(userLogged, req.body.password)) {
				const token = jwt.sign({ id: userLogged._id }, SECRET_COOKIE, {
					expiresIn: "2min",
				});
				res
					.cookie("jwt", token, {
						signed: true,
						httpOnly: true,
						maxAge: 1000 * 60 * 10,
					})
					// .redirect("/");
					.json({ status: 200, msg: "Usuario logueado correctamente" });
			} else {
				res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
			}
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const authGitHub = async (req, res) => {};

const authGitHubCallback = (req, res) => {
	const token = jwt.sign({ id: req.user._id }, SECRET_COOKIE, {
		expiresIn: "1h",
	});
	res
		.cookie("jwt", token, {
			signed: true,
			httpOnly: true,
			maxAge: 1000 * 60 * 10,
		})
		.redirect("/");
};

const logout = async (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie("jwt");
		res.redirect("/login");
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};
export const controllersSessions = {
	register,
	login,
	logout,
	authGitHub,
	authGitHubCallback,
};
