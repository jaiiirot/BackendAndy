import passport from "../service/passport.js";

export const authenticateJWT = passport.authenticate("jwt", {
	session: false,
	failureRedirect: "/login",
});

export const authentication = (req, res, next) => {
	const existJwt = !!req.signedCookies.jwt;

	if (existJwt) {
		return authenticateJWT(req, res, next);
	} else {
		req.user = { role: "USER", cart: null, username: null };
		next();
	}
};
