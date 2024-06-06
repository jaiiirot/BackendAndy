import { messagesService } from "../feature/messages/repository/messages.service.js";
export const initialSocket = socket => {
	socket.on("connection", io => {
		console.log("New user connected");
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
