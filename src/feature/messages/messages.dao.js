import { Messages } from "./messages.schema.js";

class MessagesDAO {
	async getAll() {
		try {
			return await Messages.find();
		} catch (error) {
			console.error("Error al obtener todos los mensajes:", error);
			throw error;
		}
	}

	async getByIdMessage(mid) {
		try {
			return await Messages.findById(mid);
		} catch (error) {
			console.error("Error al obtener mensaje por id:", error);
			throw error;
		}
	}

	async addMessage(data) {
		try {
			console.log(data);
			return await Messages.create(data);
		} catch (error) {
			console.error("Error al agregar un mensaje:", error);
			throw error;
		}
	}

	async postMessage(messageId, message) {
		try {
			const existChat = await this.getByIdMessage(messageId);
			if (existChat) {
				await Messages.updateOne(
					{ _id: messageId },
					{ $push: { messages: message } }
				);
			} else {
				throw new Error("Chat no encontrado");
			}
		} catch (error) {
			console.error("Error al agregar un mensaje:", error);
			throw error;
		}
	}

	async getMessages() {
		try {
			return await Messages.find();
		} catch (error) {
			console.error("Error al obtener todos los mensajes:", error);
			throw error;
		}
	}
}

export default new MessagesDAO();
