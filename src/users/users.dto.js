import { hashPassword } from "../utils/crypt.js";
import UsersDAO from "./users.dao.js";
import CartsDAO from "../carts/carts.dao.js";
import MessagesDAO from "../messages/messages.dao.js";
class UsersDTO {
	async createUserData(username, photo, first, last, email, password, age) {
		const CartId = await CartsDAO.addCart();
		const MessageId = await MessagesDAO.addMessage();
		return {
			username: username || "",
			photo_user: photo || "",
			first_name: first || "",
			last_name: last || "",
			email,
			password: password || "",
			age: age || "",
			cart: { cid: CartId },
			messages: { mid: MessageId}
		};
	}

	async fromGithub(data) {
		try {
			const { _json, emails } = await data;
			const userData = await this.createUserData(
				_json.login,
				_json.avatar_url,
				_json.name,
				"",
				emails[0].value,
				"",
				""
			);
			return await UsersDAO.postUser(userData);
		} catch (error) {
			console.error("Error en fromGithub:", error);
			throw error;
		}
	}

	async fromLocalRegister(data) {
		try {
			const { username, email, password } = await data;
			const userData = await this.createUserData(
				username,
				"",
				"",
				"",
				email,
				password,
				""
			);
			userData.password = hashPassword(userData.password);
			return await UsersDAO.postUser(userData);
		} catch (error) {
			console.error("Error en fromLocalRegister:", error);
			throw error;
		}
	}
}

export default new UsersDTO();
