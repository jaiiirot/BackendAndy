import passport from "../service/passport.js";

export const authenticateJWT = passport.authenticate("jwt", {
	session: false,
});

export const authenticate = () => {
	return (req, res, next) => {
		console.log(req);
		next();
		// if (req.isAuthenticated()) {
		// return next();
		// }
		// res.redirect("/login");
	};
};

export const authRole = (ROLE = []) => {
	return (req, res, next) => {
		const { role } = req.user;
		if (ROLE.includes(role)) {
			next();
		} else if (role === "ADMIN") {
			res.redirect("/panel");
		} else {
			res.status(401).redirect("/login");
		}
	};
};
