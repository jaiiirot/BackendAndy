import passport from "passport";

export const authenticateJWT = passport.authenticate("jwt", {
	session: false,
	failureRedirect: "/",
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
