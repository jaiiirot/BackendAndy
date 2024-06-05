import { Router } from "express";
import { validateData } from "../../middlewares/validacion.js";
import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { controllersSessions } from "./sessions.controller.js";
import passport from "passport";

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

router.get(
	"/current",
	authentication,
	authorization(["ADMIN", "CLIENT"]),
	function (req, res) {
		res.json(req.user);
	}
);
export default router;
