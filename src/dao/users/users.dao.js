import { Users } from "./users.schema.js";

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

	async postUser(data) {
		try {
			console.log(data);
			return await Users.create(data);
		} catch (error) {
			console.error("Error al crear un nuevo usuario:", error);
			throw error;
		}
	}
}

export default new UsersDAO();
