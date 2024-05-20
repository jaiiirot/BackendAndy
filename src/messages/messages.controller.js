// hace enpoints para ,amejar mensajes con soketio y https, este es el  controlador de los mensajes
import MessagesDAO from "./messages.dao.js";
import { initialSocket } from "../service/socket.js";

const postMessage = async (req, res) => {
	try {
		const { name, email, message } = req.body;
		const newMessage = await MessagesDAO.addMessage({ name, email, message });
		initialSocket();
		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await MessagesDAO.getMessages();
		res.status(200).json(messages);
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const deleteMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const message = await MessagesDAO.deleteMessage(id);
		res.status(200).json(message);
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

const putMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, message } = req.body;
		const messageUpdated = await MessagesDAO.updateMessage(id, {
			name,
			email,
			message,
		});
		res.status(200).json(messageUpdated);
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).json({ error });
	}
};

export const controllersMessages = {
	postMessage,
	getMessages,
	deleteMessage,
	putMessage,
};
