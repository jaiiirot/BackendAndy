import { Users } from "../schemas/users.schema.js";
import CartsDAO from "./carts.dao.js";

class UsersDAO {
	async getAll() {
		try {
			return await Users.find();
		} catch (error) {
			console.error("Error al obtener todos los usuarios:", error);
			throw error;
		}
	}

	async getById(id) {
		try {
			return await Users.findById({ _id: id }, { password: 0 });
		} catch (error) {
			console.error("Error al obtener usuario por id:", error);
			throw error;
		}
	}

	async getByEmail(email) {
		try {
			return await Users.findOne({ email });
		} catch (error) {
			console.error(
				`Error al obtener usuario con correo electrónico ${email}:`,
				error
			);
			throw error;
		}
	}

	async getByEmailAndPassword(data) {
		try {
			return await Users.findOne({
				email: data.email,
				password: data.password,
			});
		} catch (error) {
			console.error(
				"Error al obtener usuario por correo electrónico y contraseña:",
				error
			);
			throw error;
		}
	}

	async getByNameUserGithub(username) {
		try {
			return await Users.findOne({ username }).lean();
		} catch (error) {
			console.error("Error al obtener usuario por nombre de usuario:", error);
			throw error;
		}
	}

	async postUser(data) {
		try {
			const CartId = await CartsDAO.addCart();
			return new Users({ ...data, cart: { cid: CartId } }).save();
		} catch (error) {
			console.error("Error al crear un nuevo usuario:", error);
			throw error;
		}
	}
}

export default new UsersDAO();
