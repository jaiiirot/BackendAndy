export const authorization = (ROLE = []) => {
	return (req, res, next) => {
		const { role } = req.user;
		const redirect = role === "ADMIN" ? "panel" : "";
		const msg = role === "ADMIN" ? "?msg=bienvenido" : "";
		if (ROLE.includes(role)) {
			req.infoUser = false;
			if (role === "USER") {
				req.infoUser = {
					exist: false,
				};
			} else if (role === "ADMIN") {
				req.infoUser = {
					exist: true,
					info: { username: req.user.username, chat: req.user.messages.mid },
				};
			} else if (role === "CLIENT") {
				req.infoUser = {
					exist: true,
					info: {
						username: req.user.username,
						cart: req.user.cart.cid,
						chat: req.user.messages.mid,
					},
				};
			}
			next();
		} else {
			res.status(401).redirect(`/${redirect}${msg}`);
		}
	};
};
