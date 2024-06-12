import { Router } from "express";
import { validateData } from "../../middlewares/validacion.js";
import { controllersSessions } from "./sessions.controller.js";
import passport from "passport";
import { servicesExternal } from "../../services/repository/external.service.js";

const router = Router();

router.post(
	"/register",
	validateData("register"),
	controllersSessions.register
);
router.post("/login", validateData("login"), controllersSessions.login);
router.get("/logout", controllersSessions.logout);
router.get(
	"/auth/github",
	passport.authenticate("github", {
		scope: ["user:email"],
	}),
	controllersSessions.authGitHub
);
router.get(
	"/auth/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/login",
	}),
	controllersSessions.authGitHubCallback
);
router.post("/forget/:email", controllersSessions.forgetPassword);

router.post(
	"/reset/password/",
	(req, res, next) => {
		try {
			if (!servicesExternal.getToken(req.body.token)) res.redirect("/");
			if (!servicesExternal.getToken(req.signedCookies.token))
				res.redirect("/");
			req.userreset = servicesExternal.getToken(req.signedCookies.token);
			next();
		} catch (error) {
			console.error("🔴 Error al restablecer la contraseña:", error);
			res.status(500).json({ msg: "Error interno del servidor" });
		}
	},
	controllersSessions.resetPassword
);

export default router;
