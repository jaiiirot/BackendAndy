export const initialSocket = socket => {
	const messages = [];
	socket.on("connection", io => {
		console.log("New user connected");
		io.on("input_chat", async data => {
			await fetch(`/api/messages/${data.mid}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data.msg),
			});
			console.log(data);
			console.log(messages);
			messages.push(data.msg);
			socket.emit("container_chat", messages);
		});
	});
};
