export const authSessionAdmin = (req, res, next) => {
	if (req.session && req.session.user) {
		if (!req.session.user.admin) {
			res.redirect("/?msg=true");
		} else {
			next();
		}
	} else {
		res.redirect("/");
	}
};

export const authSessionUser = (req, res, next) => {
	if (req.session && req.session.user) {
		if (!req.session.user.admin) {
			next();
		} else {
			res.redirect("/panel?msg=true");
		}
	} else {
		next();
	}
};
