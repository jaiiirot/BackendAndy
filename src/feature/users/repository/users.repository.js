import { servicesExternal } from "../../../services/repository/external.service.js";
import { emailDeleteCountInactive } from "../../../utils/emailtermplate.js";
import { logger } from "../../../utils/logger/logger.js";
import UsersDTO from "../users.dto.js";

export default class UsersRepository {
	constructor(dao, cartDao, messageDao) {
		this.dao = dao;
		this.cartDao = cartDao;
		this.messageDao = messageDao;
	}

	getAllCondition = async query => {
		try {
			logger.info("R: 🔍 Buscando todos los productos");
			const products = await this.dao.getAllCondition(query);
			logger.info("R: 🛍️ Todos los productos obtenidos correctamente");
			return products;
		} catch (error) {
			logger.error("R: 🔴 Error al obtener todos los productos:", error);
			throw error;
		}
	};

	getAll = async (query, options) => {
		try {
			const users = await this.dao.getAll(query, options);
			logger.info("R: 👥 Todos los usuarios obtenidos correctamente");
			return users;
		} catch (error) {
			logger.error("R: 🔴 Error al obtener todos los usuarios:", error);
			throw error;
		}
	};

	getById = async id => {
		try {
			const user = await this.dao.getById(id);
			logger.info(`R: 👤 Usuario con ID ${id} obtenido correctamente`);
			return user;
		} catch (error) {
			logger.error(`R: 🔴 Error al obtener usuario por ID ${id}:`, error);
			throw error;
		}
	};

	getByEmail = async email => {
		try {
			const user = await this.dao.getByEmail(email);
			logger.info(`R: 📧 Usuario con email ${email} obtenido correctamente`);
			return user;
		} catch (error) {
			logger.error("R: 🔴 Error al obtener usuario por email:", error);
			throw error;
		}
	};

	getByEmailAndPassword = async data => {
		try {
			const user = await this.dao.getByEmailAndPassword(data);
			logger.info(
				"R: 🔑 Usuario obtenido por email y contraseña correctamente"
			);
			return user;
		} catch (error) {
			logger.error(
				"R: 🔴 Error al obtener usuario por email y contraseña:",
				error
			);
			throw error;
		}
	};

	post = async data => {
		try {
			const newUser = await this.dao.postUser(data);
			logger.info("R: 🆕 Nuevo usuario creado correctamente");
			return newUser;
		} catch (error) {
			logger.error("R: 🔴 Error al crear un nuevo usuario:", error);
			throw error;
		}
	};

	postDocuments = async (uid, files) => {
		try {
			const user = await this.dao.getById(uid);
			if (!user) {
				logger.warning(`R: ⚠️ Usuario no encontrado para el ID ${uid}`);
				return { msg: "Usuario no encontrado" };
			} else {
				const iden = ["ID", "CDD", "CDEDC"];
				const documentsUrl = [];
				for (const [i, file] of files.entries()) {
					const url = await servicesExternal.postDocumentBuffer(
						file.buffer,
						`${iden[i]}-${uid}.pdf`
					);
					// console.log({ name: `${iden[i]}.${uid}`, reference: url });
					documentsUrl.push({ name: `${iden[i]}${uid}`, reference: url });
				}
				if (!documentsUrl || documentsUrl.length < 3) {
					logger.error(
						`R: 🔴 Error al subir documento para el usuario con ID ${uid}`
					);
					return null;
				}
				const document = await this.dao.postDocument(uid, documentsUrl);
				await this.putRole(uid, "PREMIUM");
				logger.info(
					`R: 📄 Documento subido correctamente para el usuario con ID ${uid}`
				);
				return document;
			}
		} catch (error) {
			logger.error(
				`R: 🔴 Error al subir documento para el usuario con ID ${uid}:`,
				error
			);
			throw error;
		}
	};

	put = async (id, data) => {
		try {
			const user = await this.dao.putUser(id, data);
			logger.info(`R: ♻️ Usuario con ID ${id} actualizado correctamente`);
			return user;
		} catch (error) {
			logger.error(`R: 🔴 Error al actualizar usuario por ID ${id}:`, error);
			throw error;
		}
	};

	putPasswordByEmail = async data => {
		try {
			const user = await this.dao.getByEmail(data.email);
			if (!user) {
				logger.warning(
					`R: ⚠️ Usuario no encontrado para el email ${data.email}`
				);
				return { msg: "Usuario no encontrado" };
			}
			const isSamePassword = await servicesExternal.comparePassword(
				data.password,
				user.password
			);
			if (isSamePassword) {
				logger.warning(
					`R: ⚠️ La nueva contraseña no puede ser igual a la anterior para el email ${data.email}`
				);
				return { msg: "La nueva contraseña no puede ser igual a la anterior" };
			}
			data.password = await servicesExternal.hashPassword(data.password);
			const updatedUser = await this.dao.putPasswordByEmail(data);
			logger.info(
				`R: 🔒 Contraseña de usuario actualizada correctamente para el email ${data.email}`
			);
			return updatedUser;
		} catch (error) {
			logger.error(
				"R: 🔴 Error al actualizar contraseña de usuario por email:",
				error
			);
			throw error;
		}
	};

	putRole = async (userId, newRole) => {
		try {
			logger.info(`R: 🔄 Actualizando rol del usuario con ID ${userId}`);
			const user = await this.dao.updateUserRole(userId, newRole);
			logger.info("R: ✅ Usuario actualizado correctamente");
			return user;
		} catch (error) {
			logger.error(
				`R: 🔴 Error al actualizar el rol del usuario: ${error.message}`
			);
			throw error;
		}
	};

	putProfileImage = async (id, buffer) => {
		try {
			logger.info(
				`R: 🔄 Actualizando imagen de perfil del usuario con ID ${id}`
			);
			const url = await servicesExternal.putImageBuffer(
				buffer,
				`profile-${id}.png`
			);
			const user = await this.dao.putProfileImage(id, url);
			logger.info(
				`R: 🔄 Imagen de perfil del usuario con ID ${id} actualizada`
			);
			return user;
		} catch (error) {
			logger.error(
				`R: 🔴 Error al actualizar la imagen de perfil del usuario: ${error.message}`
			);
			throw error;
		}
	};

	delete = async id => {
		try {
			const user = await this.dao.getById(id);
			await this.cartDao.delete(user.cart.cid);
			await this.messageDao.delete(user.messages.mid);
			await servicesExternal.deleteFsDataUser(
				user.photo_user,
				user.documents[0]
			);
			const result = await this.dao.deleteUser(id);
			logger.info(`R: 🗑️ Usuario con ID ${id} eliminado correctamente`);
			return result;
		} catch (error) {
			logger.error(`R: 🔴 Error al eliminar usuario por ID ${id}:`, error);
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
						`R: 🔓 Inicio de sesión exitoso para el email ${data.email}`
					);
					return token;
				} else {
					logger.warning(`R: ⚠️ Datos incorrectos para el email ${data.email}`);
					return { msg: "¡Datos incorrectos!" };
				}
			} else {
				logger.warning(`R: ⚠️ Datos incorrectos para el email ${data.email}`);
				return { msg: "Datos incorrectos" };
			}
		} catch (error) {
			logger.error("R: 🔴 Error al realizar inicio de sesión:", error);
			throw error;
		}
	};

	getLoginGithub = async data => {
		try {
			const token = await servicesExternal.postToken({ id: data._id }, 30);
			logger.info("R: 🔓 Inicio de sesión con GitHub exitoso");
			return token;
		} catch (error) {
			logger.error(
				"R: 🔴 Error al realizar inicio de sesión con GitHub:",
				error
			);
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
			logger.info("R: 🆕 Usuario creado desde GitHub correctamente");
			return newUser;
		} catch (error) {
			logger.error("R: 🔴 Error al crear usuario desde GitHub:", error);
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
			logger.info("R: 🆕 Usuario registrado localmente correctamente");
			return newUser;
		} catch (error) {
			logger.error(
				"R: 🔴 Error al registrar usuario desde registro local:",
				error
			);
			throw error;
		}
	};

	putLastConnection = async id => {
		try {
			const updatedUser = await this.dao.putLastConnection(id);
			logger.info(
				`R: 🔄 Última conexión del usuario con ID ${id} actualizada correctamente`
			);
			return updatedUser;
		} catch (error) {
			logger.error(
				`R: 🔴 Error al actualizar última conexión de usuario por ID ${id}:`,
				error
			);
			throw error;
		}
	};

	deleInactiveUsers = async host => {
		try {
			const response = await this.dao.deleteInactiveUsers();
			if (!response) {
				logger.warning("R: ⚠️ No se eliminaron usuarios inactivos");
				return { msg: "No se eliminaron usuarios inactivos" };
			}
			logger.info("R: 🗑️ Usuarios inactivos eliminados correctamente");
			response.forEach(async user => {
				await this.cartDao.delete(user.cart.cid);
				await this.messageDao.delete(user.messages.mid);
				await servicesExternal.deleteFsDataUser(
					user.photo_user,
					user.documents[0]
				);
				await servicesExternal.sendMailDeleteInactive(
					user.email,
					"Eliminación de usuarios inactivos",
					"Eliminación de usuarios inactivos",
					emailDeleteCountInactive(host, user.email)
				);
				logger.info(
					`R: 📧 Correo de eliminación de usuario inactivo enviado ${user.username}`
				);
			});
			return response;
		} catch (error) {
			logger.error("R: 🔴 Error al eliminar usuarios inactivos:", error);
			throw error;
		}
	};
}
