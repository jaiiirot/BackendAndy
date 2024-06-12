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
		if (!req.params.token) res.redirect("/");
		if (!servicesExternal.getToken(req.cookies.token)) res.redirect("/");
		req.email = servicesExternal.getToken(req.cookies.token);
		next();
	},
	controllersSessions.resetPassword
);

export default router;
