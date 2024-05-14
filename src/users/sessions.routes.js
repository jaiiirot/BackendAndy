import { Router } from "express";
import passport from "../service/passport.js";
import { controllersSessions } from "./sessions.controller.js";

const router = Router();

router.post("/register", controllersSessions.register);
router.post("/login", controllersSessions.login);
router.get("/logout", controllersSessions.logout);
router.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	controllersSessions.authGitHub
);
router.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	controllersSessions.authGitHubCallback
);

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	function (req, res) {
		res.json(req.user);
	}
);
export default router;
