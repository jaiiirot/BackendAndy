import passport from "../config/passport.config.js";

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export const authRole = (req, res, next) => {
	if (req.user.admin !== true) {
		console.log("No tienes permisos para acceder a esta ruta");
		req.session.destroy();
		return res.clearCookie("jwt").redirect("/login?msg=DENEGADO");
	}
	next();
};
