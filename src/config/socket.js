export const initialSocket = socket => {
	const messages = [];
	socket.on("connection", io => {
		console.log("New user connected");
		io.on("input_chat", data => {
			console.log(io);
			messages.push(data);
			socket.emit("container_chat", messages);
		});
	});
};
