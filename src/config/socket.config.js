import { Server } from "socket.io";
import { initialSocket } from "../utils/socket.js";

export const configSocketIo = httpServer => {
	const socket = new Server(httpServer);
	initialSocket(socket);
};
