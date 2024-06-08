import { messagesService } from "./repository/messages.service.js";
import { logger } from "../../utils/logger/logger.js";

const postMessage = async (req, res) => {
	try {
		const newMessage = await messagesService.addMessage(req.body.mid);
		res.status(201).json(newMessage);
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await messagesService.getMessages();
		res.status(200).json(messages);
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const deleteMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const message = await messagesService.deleteMessage(id);
		res.status(200).json(message);
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const putMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, message } = req.body;
		const messageUpdated = await messagesService.updateMessage(id, {
			name,
			email,
			message,
		});
		res.status(200).json(messageUpdated);
	} catch (error) {
		logger.error("🔴 Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

export const controllersMessages = {
	postMessage,
	getMessages,
	deleteMessage,
	putMessage,
};
