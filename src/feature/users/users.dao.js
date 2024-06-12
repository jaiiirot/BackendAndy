import { Users } from "./users.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class UsersDAO {
	async getAll() {
		try {
			logger.info("🔍 Obteniendo todos los usuarios");
			return await Users.find();
		} catch (error) {
			logger.error("🔴 Error al obtener todos los usuarios:", error);
			throw error;
		}
	}

	async getById(id) {
		try {
			logger.info(`🔍 Obteniendo usuario con ID ${id}`);
			return await Users.findById({ _id: id }, { password: 0 }).lean();
		} catch (error) {
			logger.error("🔴 Error al obtener usuario por id:", error);
			throw error;
		}
	}

	async getByEmail(email) {
		try {
			logger.info(`🔍 Obteniendo usuario con correo electrónico ${email}`);
			return await Users.findOne({ email }).lean();
		} catch (error) {
			logger.error(
				`🔴 Error al obtener usuario con correo electrónico ${email}:`,
				error
			);
			throw error;
		}
	}

	async getByEmailAndPassword(data) {
		try {
			logger.info(
				`🔍 Obteniendo usuario con correo electrónico ${data.email} y contraseña`
			);
			return await Users.findOne({
				email: data.email,
				password: data.password,
			});
		} catch (error) {
			logger.error(
				"🔴 Error al obtener usuario por correo electrónico y contraseña:",
				error
			);
			throw error;
		}
	}

	async getByEmailUserGithub(email) {
		try {
			logger.info(`🔍 Obteniendo usuario por correo electrónico ${email}`);
			return await Users.findOne({ email }).lean();
		} catch (error) {
			logger.error("🔴 Error al obtener usuario por nombre de usuario:", error);
			throw error;
		}
	}

	async postUser(data) {
		try {
			logger.info("➕ Creando un nuevo usuario");
			return new Users(data).save();
		} catch (error) {
			logger.error("🔴 Error al crear un nuevo usuario:", error);
			throw error;
		}
	}

	async putPasswordByEmail(data) {
		try {
			logger.info(
				`🔄 Actualizando la contraseña del usuario con correo electrónico ${data.email}`
			);
			return await Users.findOneAndUpdate(
				{ email: data.email },
				{ password: data.password },
				{ new: true }
			);
		} catch (error) {
			logger.error("🔴 Error al actualizar la contraseña del usuario:", error);
			throw error;
		}
	}

	async deleteUser(id) {
		try {
			logger.info(`🗑️ Eliminando usuario con ID ${id}`);
			return await Users.findByIdAndDelete(id);
		} catch (error) {
			logger.error("🔴 Error al eliminar usuario por id:", error);
			throw error;
		}
	}

	async putLastConnection(userId) {
		try {
			logger.info(
				`🔄 Actualizando la última conexión para el usuario con ID ${userId}`
			);
			return await Users.findByIdAndUpdate(
				userId,
				{ lastConnection: Date.now() },
				{ new: true }
			);
		} catch (error) {
			logger.error(
				`🔴 Error al actualizar la última conexión para el usuario con ID ${userId}:`,
				error
			);
			throw error;
		}
	}
}
