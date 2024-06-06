import { ENV } from "../../../config/config.js";
import { hashPassword, comparePassword } from "../../../utils/crypt.js";
import UsersDTO from "../users.dto.js";
import jwt from "jsonwebtoken";

const { SECRET_COOKIE } = ENV;
export default class UsersRepository {
	constructor(dao, cartDao, messageDao) {
		this.dao = dao;
		this.cartDao = cartDao;
		this.messageDao = messageDao;
	}

	getAll = async (query, options) => {
		const users = await this.dao.getAll(query, options);
		return users;
	};

	getById = async id => {
		const user = await this.dao.getById(id);
		return user;
	};

	getByEmail = async email => {
		try {
			const user = await this.dao.getByEmail(email);
			return user;
		} catch (error) {
			console.error("Error al obtener usuario por email:", error);
			throw error;
		}
	};

	getByEmailAndPassword = async data => {
		const user = await this.dao.getByEmailAndPassword(data);
		return user;
	};

	post = async data => {
		const newUser = await this.dao.postUser(data);
		return newUser;
	};

	put = async (id, data) => {
		const user = await this.dao.putUser(id, data);
		return user;
	};

	delete = async id => {
		try {
			const user = await this.dao.getById(id);
			await this.cartDao.delete(user.cart.cid);
			await this.messageDao.delete(user.messages.mid);
			const result = await this.dao.deleteUser(id);
			return result;
		} catch (error) {
			console.error("Error al eliminar usuario por id:", error);
			throw error;
		}
	};

	getLogin = async data => {
		try {
			const db = await this.dao.getByEmail(data.email);
			if (db) {
				if (comparePassword(data.password, db.password)) {
					const token = jwt.sign({ id: db._id }, SECRET_COOKIE, {
						expiresIn: "30min",
					});
					const time = {
						signed: true,
						httpOnly: true,
						maxAge: 1000 * 60 * 30,
					};
					return {
						token,
						time,
					};
				} else {
					return { msg: "¡Datos incorrectos!" };
				}
			} else {
				return { msg: "Datos incorrectos" };
			}
		} catch (error) {
			console.error("Error al obtener usuario por email y contraseña:", error);
			throw error;
		}
	};

	getLoginGithub = async data => {
		const token = jwt.sign({ id: data._id }, SECRET_COOKIE, {
			expiresIn: "30min",
		});
		const time = {
			signed: true,
			httpOnly: true,
			maxAge: 1000 * 60 * 30,
		};
		return {
			token,
			time,
		};
	};

	postFromGithub = async data => {
		const info = {};
		info.username = data._json.login;
		info.photo_user = data._json.avatar_url;
		info.first_name = data._json.name;
		info.email = data.emails[0].value;
		info.cart = await this.cartDao.addCart();
		info.messages = await this.messageDao.addMessage(data.emails[0].value);
		const user = new UsersDTO(info);
		return await this.dao.postUser(user);
	};

	postFromLocalRegister = async data => {
		try {
			const info = {};
			info.username = data.username;
			info.email = data.email;
			info.password = hashPassword(data.password);
			info.cart = await this.cartDao.addCart();
			info.messages = await this.messageDao.addMessage(data.email);
			const user = new UsersDTO(info);
			return await this.dao.postUser(user);
		} catch (error) {
			console.error("Error al registrar el usuario", error);
		}
	};
}
