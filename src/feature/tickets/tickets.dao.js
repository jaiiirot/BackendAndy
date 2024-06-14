import { Tickets } from "./tickets.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class TicketsDAO {
	getAll = async () => {
		try {
			const tickets = await Tickets.find().lean();
			logger.info("D: 📄 Todos los tickets obtenidos exitosamente.");
			return tickets;
		} catch (error) {
			logger.error("D: 🔴 Error al obtener todos los tickets:", error);
			throw error;
		}
	};

	get = async id => {
		try {
			const ticket = await Tickets.findById(id).lean();
			logger.info(`D: 📄 Ticket con ID ${id} obtenido exitosamente:`, ticket);
			return ticket;
		} catch (error) {
			logger.error(`D: 🔴 Error al obtener el ticket con ID ${id}:`, error);
			throw error;
		}
	};

	getByEmail = async email => {
		try {
			const tickets = await Tickets.find({ purchaser: email }).lean();
			logger.info(
				`D: 📄 Tickets con email ${email} obtenidos exitosamente:`,
				tickets
			);
			return tickets;
		} catch (error) {
			logger.error(
				`D: 🔴 Error al obtener el ticket con email ${email}:`,
				error
			);
			throw error;
		}
	};

	post = async ticket => {
		try {
			const newTicket = await new Tickets(ticket).save();
			logger.info("D: 📝 Nuevo ticket creado:", newTicket);
			return newTicket;
		} catch (error) {
			logger.error("D: 🔴 Error al crear un nuevo ticket:", error);
			throw error;
		}
	};

	put = async (id, ticket) => {
		try {
			const ticketUpdated = await Tickets.findByIdAndUpdate(id, ticket, {
				new: true,
			}).lean();
			logger.info(
				`D: 🔄 Ticket con ID ${id} actualizado correctamente:`,
				ticketUpdated
			);
			return ticketUpdated;
		} catch (error) {
			logger.error(`D: 🔴 Error al actualizar el ticket con ID ${id}:`, error);
			throw error;
		}
	};

	delete = async id => {
		try {
			const ticketDeleted = await Tickets.findByIdAndDelete(id);
			logger.info(`D: 🗑️ Ticket con ID ${id} eliminado exitosamente.`);
			return ticketDeleted;
		} catch (error) {
			logger.error(`D: 🔴 Error al eliminar el ticket con ID ${id}:`, error);
			throw error;
		}
	};
}
