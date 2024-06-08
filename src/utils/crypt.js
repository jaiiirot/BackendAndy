import bcrypt from "bcrypt";
import { logger } from "./logger/logger.js";

const saltRounds = 10;

export const hashPassword = password => {
	try {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(password, salt);
		// logger.info('🟢 Contraseña cifrada con éxito');
		return hashedPassword;
	} catch (error) {
		logger.error(`🔴 Error al cifrar la contraseña: ${error.message}`, {
			stack: error.stack,
		});
		return null;
	}
};

export const comparePassword = (inputPassword, dbPassword) => {
	try {
		const isMatch = bcrypt.compareSync(inputPassword, dbPassword);
		return isMatch;
	} catch (error) {
		logger.error(`🔴 Error al comparar las contraseñas: ${error.message}`, {
			stack: error.stack,
		});
		return false;
	}
};
