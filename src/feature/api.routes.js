import routesProd from "./products/products.routes.js";
import routesUser from "./users/users.routes.js";
import routesCart from "./carts/carts.routes.js";
import routesMessage from "./messages/messages.routes.js";
import routesTicket from "./tickets/tickets.routes.js";
import routesSession from "./sessions/sessions.routes.js";
import { logger } from "../utils/logger/logger.js";

export default function routesApiV1(app) {
	try {
		app.use("/api/sessions", routesSession);
		app.use("/api/products", routesProd);
		app.use("/api/users", routesUser);
		app.use("/api/messages", routesMessage);
		app.use("/api/carts", routesCart);
		app.use("/api/tickets", routesTicket);
		logger.info("🌐 Rutas API v1 agregadas correctamente.");
	} catch (error) {
		logger.error("🔴 Error al agregar rutas API v1:", error);
		throw error;
	}
}
