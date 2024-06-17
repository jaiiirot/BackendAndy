import { messagesService } from "../feature/messages/repository/messages.service.js";
import { logger } from "../utils/logger/logger.js";

const initialSocket = (socket, ENV) => {
	socket.on("connection", async io => {
		logger.info("🟢 usuario conectado");

		io.on("input_chat", async data => {
			try {
				await messagesService.postAddMessageInChat(
					data.mid,
					data.role,
					data.message
				);
				socket.emit(
					`container_chat_${data.mid}`,
					await messagesService.getChatById(data.mid)
				);
			} catch (error) {
				logger.warning("⚠️ Error al enviar mensaje:", error);
			}
		});

		io.on("onchat", async data => {
			try {
				socket.emit(
					`loadingchat_${data}`,
					await messagesService.getChatById(data)
				);
			} catch (error) {
				logger.warning("⚠️ Error al enviar mensaje:", error);
			}
		});
	});
};

export const socketService = {
	initialSocket,
};
