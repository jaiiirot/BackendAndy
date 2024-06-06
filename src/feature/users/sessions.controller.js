import { usersService } from "./repository/users.service.js";

const register = async (req, res) => {
	try {
		const user = await usersService.postFromLocalRegister(req.body);
		if (user) {
			res.status(200).json({ msg: "Usuario registrado correctamente" });
		} else {
			res.status(400).json({ msg: "Error al registrar el usuario" });
		}
	} catch (error) {
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const login = async (req, res) => {
	try {
		const user = await usersService.getLogin(req.body);
		if (user.token && user.time) {
			res
				.cookie("jwt", user.token, user.time)
				.send({ status: 200, msg: "Usuario logueado correctamente" });
		} else {
			res.status(400).send({ status: 400, msg: user.msg });
		}
	} catch (error) {
		res.status(500).send({ msg: "Error interno del servidor" });
	}
};

const authGitHub = async (req, res) => {};

const authGitHubCallback = async (req, res) => {
	try {
		const user = await usersService.getLoginGithub(req.user);
		res.cookie("jwt", user.token, user.time).redirect("/");
	} catch (error) {
		res.status(500).send({ msg: "Error interno del servidor" });
	}
};

const logout = async (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie("jwt");
		res.redirect("/");
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
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
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

export const controllersSessions = {
	register,
	login,
	logout,
	authGitHub,
	authGitHubCallback,
	deleteUser,
};
