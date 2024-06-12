import { ticketsService } from "./repository/tickets.service.js";
import { logger } from "../../utils/logger/logger.js";

const getAll = async (req, res) => {
	try {
		const tickets = await ticketsService.get();
		logger.info("🎟️ Obteniendo todos los tickets");
		res.json(tickets);
	} catch (error) {
		logger.error("🔴 Error al obtener todos los tickets:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const getTicket = async (req, res) => {
	try {
		const ticket = await ticketsService.get(req.params.tid);
		logger.info(`🎟️ Obteniendo ticket con ID ${req.params.tid}`);
		res.json(ticket);
	} catch (error) {
		logger.error("🔴 Error al obtener el ticket por ID:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const postTicket = async (req, res) => {
	try {
		const ticket = req.body;
		logger.info("📝 Creando un nuevo ticket");
		const newTicket = await ticketsService.post(ticket);
		res.json(newTicket);
	} catch (error) {
		logger.error("🔴 Error al crear el ticket:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const putTicket = async (req, res) => {
	try {
		const ticket = req.body;
		logger.info(`🔄 Actualizando ticket con ID ${req.params.tid}`);
		const ticketUpdated = await ticketsService.put(req.params.tid, ticket);
		res.json(ticketUpdated);
	} catch (error) {
		logger.error("🔴 Error al actualizar el ticket:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const deleteTicket = async (req, res) => {
	try {
		logger.info(`🗑️ Eliminando ticket con ID ${req.params.tid}`);
		const ticketDeleted = await ticketsService.delete(req.params.tid);
		res.json(ticketDeleted);
	} catch (error) {
		logger.error("🔴 Error al eliminar el ticket:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const controllersTickets = {
	getAll,
	getTicket,
	postTicket,
	putTicket,
	deleteTicket,
};
