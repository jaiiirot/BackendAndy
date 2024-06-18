import { logger } from "../utils/logger/logger.js";
export const authorization = (ROLE = []) => {
	return (req, res, next) => {
		const { role } = req.user;
		const redirect = role === "ADMIN" ? "panel" : "";
		const msg = role === "ADMIN" ? "?msg=bienvenido" : "";
		if (ROLE.includes(role)) {
			if (role === "USER") {
				req.infoUser = {
					exist: false,
				};
			} else if (role === "ADMIN") {
				req.infoUser = {
					exist: true,
					info: {
						username: req.user.username,
						chat: req.user.messages.mid,
						email: req.user.email,
					},
				};
			} else if (role === "CLIENT" || role === "PREMIUM") {
				req.infoUser = {
					exist: true,
					info: {
						id: req.user._id,
						username: req.user.username,
						cart: req.user.cart.cid,
						chat: req.user.messages.mid,
						email: req.user.email,
					},
				};
			}
			next();
		} else {
			const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
			res.status(401).redirect(`/${redirect}${msg}`);
			logger.warning(`🚧 Autorización fallida. IP: ${ip}`);
		}
	};
};
