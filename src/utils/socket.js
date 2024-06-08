import { messagesService } from "../feature/messages/repository/messages.service.js";
import { logger } from "./logger/logger.js";

export const initialSocket = (socket, ENV) => {
	socket.on("connection", async io => {
		logger.info("🟢 usuario conectado");
		io.on("input_chat", async data => {
			await messagesService.postAddMessageInChat(
				data.mid,
				data.role,
				data.message
			);
			socket.emit(
				"container_chat",
				await messagesService.getChatById(data.mid)
			);
		});
	});
};
