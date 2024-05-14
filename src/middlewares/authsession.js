import passport from "../service/passport.js";

export const authenticateJWT = passport.authenticate("jwt", {
	session: false,
});

export const authentication = (req, res, next) => {
	const existJwt = !!req.signedCookies.jwt;

	if (existJwt) {
		return authenticateJWT(req, res, next);
	} else {
		console.log("authenticate: ", existJwt);
		req.user = { role: "USER" };
		next();
	}
};

export const authorization = (ROLE = []) => {
	return (req, res, next) => {
		const { role } = req.user;
		console.log("authRole:", role, ROLE);
		if (ROLE.includes(role)) {
			req.sessionUser = null;
			if (req.user.role !== "USER") {
				req.sessionUser = {
					username: req.user.username,
					cart: req.user.cart.cid,
				};
			}
			next();
		} else {
			res.status(401).redirect("/login");
		}
	};
};
