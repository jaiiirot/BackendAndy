import { ticketsService } from "./repository/tickets.service.js";
import { logger } from "../../utils/logger/logger.js";

const getAll = async (req, res) => {
	try {
		const tickets = await ticketsService.get();
		res.json(tickets);
	} catch (error) {
		logger.error("🔴 Error al obtener todos los tickets:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const getTicket = async (req, res) => {
	try {
		const ticket = await ticketsService.get(req.params.id);
		res.json(ticket);
	} catch (error) {
		logger.error("🔴 Error al obtener el ticket por ID:", error); // Registra el error al obtener el ticket por ID
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const postTicket = async (req, res) => {
	try {
		const ticket = req.body;
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
		const ticketUpdated = await ticketsService.put(req.params.id, ticket);
		res.json(ticketUpdated);
	} catch (error) {
		logger.error("🔴 Error al actualizar el ticket:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

const deleteTicket = async (req, res) => {
	try {
		const ticketDeleted = await ticketsService.delete(req.params.id);
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
