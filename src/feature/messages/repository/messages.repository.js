import { servicesExternal } from "../../../services/repository/external.service.js";
import {
	emailPurchaseConfirmation,
	emailResetPassword,
	emailPasswordChangeConfirmation,
} from "../../../utils/emailtermplate.js";
import { logger } from "../../../utils/logger/logger.js";

export default class MessagesRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async post(data) {
		try {
			const result = await this.dao.addMessage(data);
			logger.info("R: 📩 Mensaje agregado exitosamente:", result);
			return result;
		} catch (error) {
			logger.error("R: ⚠️ Error al agregar mensaje:", error);
			throw error;
		}
	}

	async getAll() {
		try {
			const result = await this.dao.getAll();
			logger.info("R: 📄 Todos los mensajes obtenidos exitosamente.");
			return result;
		} catch (error) {
			logger.error("R: ⚠️ Error al obtener todos los mensajes:", error);
			throw error;
		}
	}

	async getById(mid) {
		try {
			const result = await this.dao.getById(mid);
			logger.info(`R: 📄 Mensaje con ID ${mid} obtenido exitosamente.`);
			return result;
		} catch (error) {
			logger.error(`R: ⚠️ Error al obtener mensaje con ID ${mid}:`, error);
			throw error;
		}
	}

	async getChatById(mid) {
		try {
			const chat = await this.dao.getById(mid);
			logger.info(`R: 💬 Chat con ID ${mid} obtenido exitosamente.`);
			return chat.messages;
		} catch (error) {
			logger.error(`R: ⚠️ Error al obtener chat con ID ${mid}:`, error);
			throw error;
		}
	}

	async postAddMessageInChat(id, role, message) {
		try {
			const result = await this.dao.postMessage(id, role, message);
			logger.info("R: 📩 Mensaje agregado en el chat exitosamente:", result);
			return result;
		} catch (error) {
			logger.error("R: ⚠️ Error al agregar mensaje en el chat:", error);
			throw error;
		}
	}

	async delete(mid) {
		try {
			const result = await this.dao.delete(mid);
			logger.info(`R: 🗑️ Mensaje con ID ${mid} eliminado exitosamente.`);
			return result;
		} catch (error) {
			logger.error(`R: ⚠️ Error al eliminar mensaje con ID ${mid}:`, error);
			throw error;
		}
	}

	async deleteClearMessageInChat(messageId) {
		try {
			const result = await this.dao.deleteClearMessage(messageId);
			logger.info(
				`R: 🗑️ Mensaje en chat con ID ${messageId} eliminado exitosamente.`
			);
			return result;
		} catch (error) {
			logger.error(
				`R: ⚠️ Error al eliminar mensaje en chat con ID ${messageId}:`,
				error
			);
			throw error;
		}
	}

	async postMessageByEmail(hostANDport, id, email) {
		try {
			const datatoken = await servicesExternal.postToken(id, 60);
			await servicesExternal.sendMail(
				email,
				`Recuperar contraseña <${email}>`,
				"Recuperar contraseña",
				emailResetPassword(hostANDport, email, datatoken.token)
			);
			logger.info(
				`R: 📧 Correo de recuperación enviado a ${email} exitosamente.`
			);
			return { datatoken, email };
		} catch (error) {
			logger.error(
				`R: ⚠️ Error al enviar correo de recuperación a ${email}:`,
				error
			);
			throw error;
		}
	}

	async postMailPurchaseCartByEmail(hostANDport, email, codeTicket, products) {
		try {
			await servicesExternal.sendMailPurchase(
				email,
				`Compra Finalizada - código: ${codeTicket}`,
				"Compra Finalizada",
				emailPurchaseConfirmation(hostANDport, email, codeTicket, products)
			);
			logger.info(
				`R: 📧 Correo de confirmación de compra enviado a ${email} exitosamente.`
			);
		} catch (error) {
			logger.error(
				`R: ⚠️ Error al enviar correo de confirmación de compra a ${email}:`,
				error
			);
			throw error;
		}
	}

	async sendMailPasswordConfirmed(host, email, username) {
		try {
			await servicesExternal.sendMailPasswordConfirmed(
				email,
				`Contraseña actualizada - ${username}`,
				"Contraseña actualizada",
				emailPasswordChangeConfirmation(host, username)
			);
			logger.info(
				`R: 📧 Correo de confirmación de contraseña enviado a ${email}.`
			);
		} catch (error) {
			logger.error(
				`R: ⚠️ Error al enviar correo de confirmación de contraseña a ${email}:`,
				error
			);
			throw error;
		}
	}
}
