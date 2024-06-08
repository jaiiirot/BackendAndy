export default class MessagesRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async post(data) {
		return await this.dao.addMessage(data);
	}

	async getAll() {
		return await this.dao.getAll();
	}

	async getById(mid) {
		return await this.dao.getById(mid);
	}

	async getChatById(mid) {
		const chat = await this.dao.getById(mid);
		console.log(chat.messages);
		return chat.messages;
	}

	async postAddMessageInChat(id, role, message) {
		// console.log(id, email, message);
		return await this.dao.postMessage(id, role, message);
	}

	async delete(mid) {
		return await this.dao.delete(mid);
	}

	async deleteClearMessageInChat(messageId) {
		return await this.dao.deleteClearMessage(messageId);
	}
}
