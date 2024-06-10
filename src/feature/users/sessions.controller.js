import { usersService } from "./repository/users.service.js";
import { messagesService } from "../messages/repository/messages.service.js";
import { logger } from "../../utils/logger/logger.js";

const register = async (req, res) => {
	try {
		const user = await usersService.postFromLocalRegister(req.body);
		if (user) {
			res.status(200).json({ msg: "Usuario registrado correctamente" });
		} else {
			res.status(400).json({ msg: "Error al registrar el usuario" });
		}
	} catch (error) {
		logger.error("🔴 Error al registrar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const login = async (req, res) => {
	try {
		const user = await usersService.getLogin(req.body);
		if (user.token && user.cookieOptions) {
			res
				.cookie("jwt", user.token, user.cookieOptions)
				.send({ status: 200, msg: "Usuario logueado correctamente" });
		} else {
			res.status(400).send({ status: 400, msg: user.msg });
		}
	} catch (error) {
		logger.error("🔴 Error al realizar el inicio de sesión:", error);
		res.status(500).send({ msg: "Error interno del servidor" });
	}
};

const authGitHub = async (req, res) => {};

const authGitHubCallback = async (req, res) => {
	try {
		const user = await usersService.getLoginGithub(req.user);
		res.cookie("jwt", user.token, user.cookieOptions).redirect("/");
	} catch (error) {
		logger.error(
			"🔴 Error al realizar el callback de autenticación de GitHub:",
			error
		);
		res.status(500).send({ msg: "Error interno del servidor" });
	}
};

const logout = async (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie("jwt");
		res.redirect("/");
	} catch (error) {
		logger.error("🔴 Error al cerrar sesión:", error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await usersService.delete(req.params.uid);
		if (user) {
			res.status(200).json({ msg: "Usuario eliminado correctamente" });
		} else {
			res.status(400).json({ msg: "Error al eliminar el usuario" });
		}
	} catch (error) {
		logger.error("🔴 Error al eliminar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const forgetPassword = async (req, res) => {
	try {
		const hostmoreport = req.rawHeaders[1];
		const result = await usersService.getByEmail(req.params.email);
		if (result) {
			await messagesService.postMessageByEmail(
				hostmoreport,
				result,
				req.params.email
			);
			logger.warning(
				`🔐 Solicitud de restablecer contraseña correcto usuario ${result._id}`
			);
			res.status(200).json({ msg: "Correo enviado correctamente" });
		} else {
			res.status(400).json({ msg: "Error al enviar el correo" });
		}
	} catch (error) {
		logger.error("🔴 Error al enviar el correo:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const resetPassword = async (req, res) => {
	try {
		// console.log(req.body); // token password repassaword email
		const user = await usersService.putPasswordByEmail(req.body);

		if (user) {
			res.status(200).json({ msg: "Contraseña actualizada correctamente" });
		} else {
			res.status(400).json({ msg: "Error al actualizar la contraseña" });
		}
	} catch (error) {
		logger.error("🔴 Error al restablecer la contraseña:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

export const controllersSessions = {
	register,
	login,
	logout,
	authGitHub,
	authGitHubCallback,
	forgetPassword,
	resetPassword,
	deleteUser,
};
