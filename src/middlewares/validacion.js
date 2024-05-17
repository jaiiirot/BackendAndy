import UsersDAO from "../users/users.dao.js";

export const validateData = option => {
	return async (req, res, next) => {
		if (option === "register") {
			const user = req.body;
			if (
				!user.username ||
				!user.email ||
				!user.reemail ||
				!user.password ||
				!user.repassword
			) {
				res.status(400).json({ msg: "Faltan datos" });
			} else if (user.email !== user.reemail) {
				res.status(400).json({ msg: "Los correos no coinciden" });
			} else if (user.password !== user.repassword) {
				res.status(400).json({ msg: "Las contraseñas no coinciden" });
			} else if (await UsersDAO.getByEmail(user.email)) {
				res.status(400).json({ msg: "El correo ya esta registrado" });
			} else {
				next();
			}
		}
	};
};
