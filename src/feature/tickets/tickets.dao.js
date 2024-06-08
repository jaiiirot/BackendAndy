import { Tickets } from "./tickets.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class TicketsDAO {
	getAll = async () => {
		try {
			const tickets = await Tickets.find().lean();
			return tickets;
		} catch (error) {
			logger.error("🔴 Error al obtener todos los tickets:", error);
			throw error;
		}
	};

	get = async id => {
		try {
			const ticket = await Tickets.findById(id).lean();
			return ticket;
		} catch (error) {
			logger.error(`🔴 Error al obtener el ticket con ID ${id}:`, error);
			throw error;
		}
	};

	post = async ticket => {
		try {
			const newTicket = await new Tickets(ticket).save();
			return newTicket;
		} catch (error) {
			logger.error("🔴 Error al crear un nuevo ticket:", error);
			throw error;
		}
	};

	put = async (id, ticket) => {
		try {
			const ticketUpdated = await Tickets.findByIdAndUpdate(id, ticket, {
				new: true,
			});
			return ticketUpdated;
		} catch (error) {
			logger.error(`🔴 Error al actualizar el ticket con ID ${id}:`, error);
			throw error;
		}
	};

	delete = async id => {
		try {
			const ticketDeleted = await Tickets.findByIdAndDelete(id);
			return ticketDeleted;
		} catch (error) {
			logger.error(`🔴 Error al eliminar el ticket con ID ${id}:`, error);
			throw error;
		}
	};
}
