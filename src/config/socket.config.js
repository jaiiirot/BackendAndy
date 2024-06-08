import { Server } from "socket.io";
import { initialSocket } from "../utils/socket.js";
import { logger } from "../utils/logger/logger.js";

export const configSocketIo = (httpServer, ENV) => {
	const socket = new Server(httpServer);
	try {
		initialSocket(socket, ENV);
		logger.info("🟢 Socket.io inicializado correctamente.");
	} catch (error) {
		logger.warning("⚠️ Error en Socket.io:", error);
	}
};
