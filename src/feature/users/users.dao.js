import { Users } from "./users.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class UsersDAO {
	async getAll() {
		try {
			logger.info("D: 🔍 Obteniendo todos los usuarios");
			return await Users.find();
		} catch (error) {
			logger.error("D: 🔴 Error al obtener todos los usuarios:", error);
			throw error;
		}
	}

	async getById(id) {
		try {
			logger.info(`D: 🔍 Obteniendo usuario con ID ${id}`);
			return await Users.findById({ _id: id }, { password: 0 }).lean();
		} catch (error) {
			logger.error("D: 🔴 Error al obtener usuario por id:", error);
			throw error;
		}
	}

	async getByEmail(email) {
		try {
			logger.info(`D: 🔍 Obteniendo usuario con correo electrónico ${email}`);
			return await Users.findOne({ email }).lean();
		} catch (error) {
			logger.error(
				`D: 🔴 Error al obtener usuario con correo electrónico ${email}:`,
				error
			);
			throw error;
		}
	}

	async getByEmailAndPassword(data) {
		try {
			logger.info(
				`D: 🔍 Obteniendo usuario con correo electrónico ${data.email} y contraseña`
			);
			return await Users.findOne({
				email: data.email,
				password: data.password,
			});
		} catch (error) {
			logger.error(
				"D: 🔴 Error al obtener usuario por correo electrónico y contraseña:",
				error
			);
			throw error;
		}
	}

	async getByEmailUserGithub(email) {
		try {
			logger.info(`D: 🔍 Obteniendo usuario por correo electrónico ${email}`);
			return await Users.findOne({ email }).lean();
		} catch (error) {
			logger.error(
				"D: 🔴 Error al obtener usuario por nombre de usuario:",
				error
			);
			throw error;
		}
	}

	async postUser(data) {
		try {
			logger.info("D: ➕ Creando un nuevo usuario");
			return new Users(data).save();
		} catch (error) {
			logger.error("D: 🔴 Error al crear un nuevo usuario:", error);
			throw error;
		}
	}

	async postDocument(uid, file) {
		try {
			logger.info(`D: 📄 Agregando documento al usuario con ID ${uid}`);
			return await Users.findByIdAndUpdate(
				uid,
				{ $push: { documents: [`comprobante-${uid}`, file] } },
				{ new: true }
			);
		} catch (error) {
			logger.error("D: 🔴 Error al agregar documento al usuario:", error);
			throw error;
		}
	}

	async putPasswordByEmail(data) {
		try {
			logger.info(
				`D: 🔄 Actualizando la contraseña del usuario con correo electrónico ${data.email}`
			);
			return await Users.findOneAndUpdate(
				{ email: data.email },
				{ password: data.password },
				{ new: true }
			);
		} catch (error) {
			logger.error(
				"D: 🔴 Error al actualizar la contraseña del usuario:",
				error
			);
		}
	}

	async updateUserRole(userId, newRole) {
		try {
			logger.info(`D: 🔄 Actualizando rol del usuario con ID ${userId}`);
			const user = await Users.findById(userId);
			if (!user) {
				throw new Error("Usuario no encontrado");
			}
			user.role = newRole;
			await user.save();
			return user;
		} catch (error) {
			logger.error(
				`D: 🔴 Error al actualizar el rol del usuario: ${error.message}`
			);
			throw error;
		}
	}

	async deleteUser(id) {
		try {
			logger.info(`D: 🗑️ Eliminando usuario con ID ${id}`);
			return await Users.findByIdAndDelete(id);
		} catch (error) {
			logger.error("D: 🔴 Error al eliminar usuario por id:", error);
			throw error;
		}
	}

	async putLastConnection(userId) {
		try {
			logger.info(
				`D: 🔄 Actualizando la última conexión para el usuario con ID ${userId}`
			);
			return await Users.findByIdAndUpdate(
				userId,
				{ lastConnection: Date.now() },
				{ new: true }
			);
		} catch (error) {
			logger.error(
				`D: 🔴 Error al actualizar la última conexión para el usuario con ID ${userId}:`,
				error
			);
			throw error;
		}
	}

	async getAllCondition(query) {
		try {
			logger.info("D: 🔍 Buscando usuarios");
			return await Users.find({}, query);
		} catch (error) {
			logger.error("D: 🔴 Error al buscar usuarios:", error);
			throw error;
		}
	}

	async deleteInactiveUsers() {
		try {
			// const threshold = new Date(Date.now() - 30 * 60 * 1000); // 30 minutos de inactividad para pruebas, cambiar a 2 días para producción
			// const inactiveUsers = await Users.find({ lastConnection: { $lt: threshold } });
			// const transporter = nodemailer.createTransport({
			// 	service: 'gmail',
			// 	auth: {
			// 		user: 'tu-email@gmail.com',
			// 		pass: 'tu-password'
			// 	}
			// });
			// for (const user of inactiveUsers) {
			// 	await transporter.sendMail({
			// 		from: 'tu-email@gmail.com',
			// 		to: user.email,
			// 		subject: 'Cuenta eliminada por inactividad',
			// 		text: 'Tu cuenta ha sido eliminada debido a la inactividad en los últimos días.'
			// 	});
			// 	await Users.findByIdAndDelete(user._id);
			// 	logger.info(`D: 🗑️ Usuario eliminado por inactividad: ${user.email}`);
			// }
		} catch (error) {
			logger.error("D: 🔴 Error al eliminar usuarios inactivos:", error);
			throw error;
		}
	}
}
