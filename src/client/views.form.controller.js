import { logger } from "../utils/logger/logger.js";

const Login = (req, res) => {
	try {
		res.render("components/form/login", {
			layout: "form",
			login: {
				title: "Login || Andy",
			},
		});
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
	}
};

const Register = (req, res) => {
	try {
		res.render("components/form/register", {
			layout: "form",
			login: {
				title: "Registrarse",
			},
		});
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
	}
};

const Forget = (req, res) => {
	try {
		res.render("components/form/forget", {
			layout: "form",
			login: {
				title: "Olvidé mi contraseña",
			},
		});
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
	}
};

const Reset = (req, res) => {
	try {
		res.render("components/form/reset", {
			layout: "form",
			login: {
				title: "Recuperar contraseña",
			},
		});
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
	}
};

export const controllersViewforms = {
	Login,
	Register,
	Forget,
	Reset,
};
