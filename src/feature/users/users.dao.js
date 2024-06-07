import { Users } from "./users.schema.js";
export default class UsersDAO {
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
			return await Users.findById({ _id: id }, { password: 0 }).lean();
		} catch (error) {
			console.error("Error al obtener usuario por id:", error);
			throw error;
		}
	}

	async getByEmail(email) {
		try {
			return await Users.findOne({ email }).lean();
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

	async getByEmailUserGithub(email) {
		try {
			return await Users.findOne({ email }).lean();
		} catch (error) {
			console.error("Error al obtener usuario por nombre de usuario:", error);
			throw error;
		}
	}

	async postUser(data) {
		try {
			return new Users(data).save();
		} catch (error) {
			console.error("Error al crear un nuevo usuario:", error);
			throw error;
		}
	}

	async putPasswordByEmail(data) {
		try {
			return await Users.findOne.update(
				{ email: data.email },
				{ password: data.password }
			);
		} catch (error) {
			console.error("Error al actualizar la contraseña del usuario:", error);
			throw error;
		}
	}

	async deleteUser(id) {
		try {
			return await Users.findByIdAndDelete(id);
		} catch (error) {
			console.error("Error al eliminar usuario por id:", error);
			throw error;
		}
	}
}
