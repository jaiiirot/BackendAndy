import { servicesExternal } from "../../../services/repository/external.service.js";
import { logger } from "../../../utils/logger/logger.js";
import UsersDTO from "../users.dto.js";

export default class UsersRepository {
	constructor(dao, cartDao, messageDao) {
		this.dao = dao;
		this.cartDao = cartDao;
		this.messageDao = messageDao;
	}

	getAll = async (query, options) => {
		try {
			const users = await this.dao.getAll(query, options);
			logger.info("👥 Todos los usuarios obtenidos correctamente");
			return users;
		} catch (error) {
			logger.error("🔴 Error al obtener todos los usuarios:", error);
			throw error;
		}
	};

	getById = async id => {
		try {
			const user = await this.dao.getById(id);
			logger.info(`👤 Usuario con ID ${id} obtenido correctamente`);
			return user;
		} catch (error) {
			logger.error(`🔴 Error al obtener usuario por ID ${id}:`, error);
			throw error;
		}
	};

	getByEmail = async email => {
		try {
			const user = await this.dao.getByEmail(email);
			logger.info(`📧 Usuario con email ${email} obtenido correctamente`);
			return user;
		} catch (error) {
			logger.error("🔴 Error al obtener usuario por email:", error);
			throw error;
		}
	};

	getByEmailAndPassword = async data => {
		try {
			const user = await this.dao.getByEmailAndPassword(data);
			logger.info(`🔑 Usuario obtenido por email y contraseña correctamente`);
			return user;
		} catch (error) {
			logger.error(
				"🔴 Error al obtener usuario por email y contraseña:",
				error
			);
			throw error;
		}
	};

	post = async data => {
		try {
			const newUser = await this.dao.postUser(data);
			logger.info("🆕 Nuevo usuario creado correctamente");
			return newUser;
		} catch (error) {
			logger.error("🔴 Error al crear un nuevo usuario:", error);
			throw error;
		}
	};

	put = async (id, data) => {
		try {
			const user = await this.dao.putUser(id, data);
			logger.info(`♻️ Usuario con ID ${id} actualizado correctamente`);
			return user;
		} catch (error) {
			logger.error(`🔴 Error al actualizar usuario por ID ${id}:`, error);
			throw error;
		}
	};

	putPasswordByEmail = async data => {
		try {
			const user = await this.dao.getByEmail(data.email);
			if (!user) {
				logger.warning(`⚠️ Usuario no encontrado para el email ${data.email}`);
				return { msg: "Usuario no encontrado" };
			}
			const isSamePassword = await servicesExternal.comparePassword(
				data.password,
				user.password
			);
			if (isSamePassword) {
				logger.warning(
					`⚠️ La nueva contraseña no puede ser igual a la anterior para el email ${data.email}`
				);
				return { msg: "La nueva contraseña no puede ser igual a la anterior" };
			}
			data.password = await servicesExternal.hashPassword(data.password);
			const updatedUser = await this.dao.putPasswordByEmail(data);
			logger.info(
				`🔒 Contraseña de usuario actualizada correctamente para el email ${data.email}`
			);
			return updatedUser;
		} catch (error) {
			logger.error(
				"🔴 Error al actualizar contraseña de usuario por email:",
				error
			);
			throw error;
		}
	};

	putRole = async (userId, newRole) => {
		try {
			logger.info(`🔄 Actualizando rol del usuario con ID ${userId}`);
			const user = await this.dao.updateUserRole(userId, newRole);
			logger.info("✅ Usuario actualizado correctamente");
			return user;
		} catch (error) {
			logger.error(
				`🔴 Error al actualizar el rol del usuario: ${error.message}`
			);
			throw error;
		}
	};

	delete = async id => {
		try {
			const user = await this.dao.getById(id);
			await this.cartDao.delete(user.cart.cid);
			await this.messageDao.delete(user.messages.mid);
			const result = await this.dao.deleteUser(id);
			logger.info(`🗑️ Usuario con ID ${id} eliminado correctamente`);
			return result;
		} catch (error) {
			logger.error(`🔴 Error al eliminar usuario por ID ${id}:`, error);
			throw error;
		}
	};

	getLogin = async data => {
		try {
			const db = await this.dao.getByEmail(data.email);
			if (db) {
				if (servicesExternal.comparePassword(data.password, db.password)) {
					const token = await servicesExternal.postToken({ id: db._id }, 30);
					logger.info(
						`🔓 Inicio de sesión exitoso para el email ${data.email}`
					);
					return token;
				} else {
					logger.warning(`⚠️ Datos incorrectos para el email ${data.email}`);
					return { msg: "¡Datos incorrectos!" };
				}
			} else {
				logger.warning(`⚠️ Datos incorrectos para el email ${data.email}`);
				return { msg: "Datos incorrectos" };
			}
		} catch (error) {
			logger.error("🔴 Error al realizar inicio de sesión:", error);
			throw error;
		}
	};

	getLoginGithub = async data => {
		try {
			const token = await servicesExternal.postToken({ id: data._id }, 30);
			logger.info("🔓 Inicio de sesión con GitHub exitoso");
			return token;
		} catch (error) {
			logger.error("🔴 Error al realizar inicio de sesión con GitHub:", error);
			throw error;
		}
	};

	postFromGithub = async data => {
		try {
			const info = {
				username: data._json.login,
				photo_user: data._json.avatar_url,
				first_name: data._json.name,
				email: data.emails[0].value,
				cart: await this.cartDao.addCart(),
				messages: await this.messageDao.addMessage(data.emails[0].value),
			};
			const user = new UsersDTO(info);
			const newUser = await this.dao.postUser(user);
			logger.info("🆕 Usuario creado desde GitHub correctamente");
			return newUser;
		} catch (error) {
			logger.error("🔴 Error al crear usuario desde GitHub:", error);
			throw error;
		}
	};

	postFromLocalRegister = async data => {
		try {
			const info = {
				username: data.username,
				email: data.email,
				password: servicesExternal.hashPassword(data.password),
				cart: await this.cartDao.addCart(),
				messages: await this.messageDao.addMessage(data.email),
			};
			const user = new UsersDTO(info);
			const newUser = await this.dao.postUser(user);
			logger.info("🆕 Usuario registrado localmente correctamente");
			return newUser;
		} catch (error) {
			logger.error(
				"🔴 Error al registrar usuario desde registro local:",
				error
			);
			throw error;
		}
	};

	putLastConnection = async id => {
		try {
			const updatedUser = await this.dao.putLastConnection(id);
			logger.info(
				`🔄 Última conexión del usuario con ID ${id} actualizada correctamente`
			);
			return updatedUser;
		} catch (error) {
			logger.error(
				`🔴 Error al actualizar última conexión de usuario por ID ${id}:`,
				error
			);
			throw error;
		}
	};
}
