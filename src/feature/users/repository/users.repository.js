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
			return users;
		} catch (error) {
			logger.error("🔴 Error al obtener todos los usuarios:", error);
			throw error;
		}
	};

	getById = async id => {
		try {
			const user = await this.dao.getById(id);
			return user;
		} catch (error) {
			logger.error(`🔴 Error al obtener usuario por ID ${id}:`, error);
			throw error;
		}
	};

	getByEmail = async email => {
		try {
			const user = await this.dao.getByEmail(email);
			return user;
		} catch (error) {
			logger.error("🔴 Error al obtener usuario por email:", error);
			throw error;
		}
	};

	getByEmailAndPassword = async data => {
		try {
			const user = await this.dao.getByEmailAndPassword(data);
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
			return newUser;
		} catch (error) {
			logger.error("🔴 Error al crear un nuevo usuario:", error);
			throw error;
		}
	};

	put = async (id, data) => {
		try {
			const user = await this.dao.putUser(id, data);
			return user;
		} catch (error) {
			logger.error(`🔴 Error al actualizar usuario por ID ${id}:`, error);
			throw error;
		}
	};

	putPasswordByEmail = async data => {
		try {
			data.password = await servicesExternal.hashPassword(data.password);
			return await this.dao.putPasswordByEmail(data);
		} catch (error) {
			logger.error(
				"🔴 Error al actualizar contraseña de usuario por email:",
				error
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
					return await servicesExternal.postToken({ id: db._id }, 30);
				} else {
					return { msg: "¡Datos incorrectos!" };
				}
			} else {
				return { msg: "Datos incorrectos" };
			}
		} catch (error) {
			logger.error("🔴 Error al realizar inicio de sesión:", error);
			throw error;
		}
	};

	getLoginGithub = async data => {
		try {
			return await servicesExternal.postToken({ id: data._id }, 30);
		} catch (error) {
			logger.error("🔴 Error al realizar inicio de sesión con GitHub:", error);
			throw error;
		}
	};

	postFromGithub = async data => {
		try {
			const info = {};
			info.username = data._json.login;
			info.photo_user = data._json.avatar_url;
			info.first_name = data._json.name;
			info.email = data.emails[0].value;
			info.cart = await this.cartDao.addCart();
			info.messages = await this.messageDao.addMessage(data.emails[0].value);
			const user = new UsersDTO(info);
			return await this.dao.postUser(user);
		} catch (error) {
			logger.error("🔴 Error al crear usuario desde GitHub:", error);
			throw error;
		}
	};

	postFromLocalRegister = async data => {
		try {
			const info = {};
			info.username = data.username;
			info.email = data.email;
			info.password = servicesExternal.hashPassword(data.password);
			info.cart = await this.cartDao.addCart();
			info.messages = await this.messageDao.addMessage(data.email);
			const user = new UsersDTO(info);
			return await this.dao.postUser(user);
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
			return await this.dao.putLastConnection(id);
		} catch (error) {
			logger.error(
				`🔴 Error al actualizar última conexión de usuario por ID ${id}:`,
				error
			);
			throw error;
		}
	};
}
