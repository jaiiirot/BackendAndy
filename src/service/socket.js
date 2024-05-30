import messagesDao from "../messages/messages.dao.js";
export const initialSocket = socket => {
	const messages = [];
	socket.on("connection", io => {
		console.log("New user connected");
		io.on("input_chat", async data => {
			console.log(data.mid, data.msg);
			const newMessage = await messagesDao.postMessage(data.mid, data.content);
			console.log(newMessage);
			socket.emit("container_chat", messages);
		});
	});
};
