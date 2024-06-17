import jwt from "jsonwebtoken";
import { logger } from "../utils/logger/logger.js";
import { ENV } from "../config/config.js";

const createToken = (data, time) => {
	const token = jwt.sign(data, ENV.SECRET_COOKIE, {
		expiresIn: `${time}min`,
	});
	const cookieOptions = {
		signed: true,
		httpOnly: true,
		maxAge: time * 60 * 1000,
	};
	return { token, cookieOptions };
};

const verifyToken = token => {
	try {
		const result = jwt.verify(token, ENV.SECRET_COOKIE);
		logger.info(`🔓 usuario ${result.email} en estado para cambiar contraseña`);
		return result;
	} catch (error) {
		logger.warning("❌ TOKEN INCORRECTO de usuario: ", error);
	}
};

const decodeToken = token => {
	const result = jwt.decode(token);
	return result;
};

export const jwtService = {
	createToken,
	verifyToken,
	decodeToken,
};
