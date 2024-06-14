import passport from "passport";
import { logger } from "../utils/logger/logger.js";

export const authenticateJWT = (req, res, next) => {
	passport.authenticate(
		"jwt",
		{
			session: false,
			failureRedirect: "/",
		},
		(err, user, info) => {
			if (err) {
				logger.error("🔴 Error en la autenticación JWT:", err);
				return next(err);
			}
			if (!user) {
				logger.error("🔴 Usuario no autenticado");
				return res.redirect("/");
			}
			// console.log(user);
			req.user = user;
			next();
		}
	)(req, res, next);
};

export const authentication = (req, res, next) => {
	const existJwt = !!req.signedCookies.jwt;

	if (existJwt) {
		return authenticateJWT(req, res, next);
	} else {
		req.user = { role: "USER", cart: null, username: null };
		next();
	}
};
