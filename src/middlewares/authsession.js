export const authSessionAdmin = (req, res, next) => {
	if (req.user) {
		if (!req.user.admin) {
			res.redirect("/?msg=true");
		} else {
			next();
		}
	} else {
		res.redirect("/");
	}
};

export const authSessionUser = (req, res, next) => {
	if (req.user) {
		if (!req.user.admin) {
			next();
		} else {
			res.redirect("/panel?msg=true");
		}
	} else {
		next();
	}
};

// export const authSession = (req, res, next, role) => {
// 	const userRole = req.session.use.role;
// 	if (userRole === role) {
// 		next();
// 	} else {
// 		res.redirect("/");
// 	}
// };
