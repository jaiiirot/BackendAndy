import { ticketsService } from "./repository/tickets.service.js";

const getAll = async (req, res) => {
	const tickets = await ticketsService.get();
	res.json(tickets);
};

const getTicket = async (req, res) => {
	const ticket = await ticketsService.get(req.params.id);
	res.json(ticket);
};

const postTicket = async (req, res) => {
	const ticket = req.body;
	const newTicket = await ticketsService.post(ticket);
	res.json(newTicket);
};

const putTicket = async (req, res) => {
	const ticket = req.body;
	const ticketUpdated = await ticketsService.put(req.params.id, ticket);
	res.json(ticketUpdated);
};

const deleteTicket = async (req, res) => {
	const ticketDeleted = await ticketsService.delete(req.params.id);
	res.json(ticketDeleted);
};

export const controllersTickets = {
	getAll,
	getTicket,
	postTicket,
	putTicket,
	deleteTicket,
};
