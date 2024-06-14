import { logger } from "../../../utils/logger/logger.js";
import TicketDTO from "../tickets.dto.js";

export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => {
		try {
			const result = await this.dao.getAll();
			logger.info("R: 📄 Todos los tickets obtenidos exitosamente.");
			return result ? result.map(ticket => new TicketDTO(ticket)) : result;
		} catch (error) {
			logger.error("R: ⚠️ Error al obtener todos los tickets:", error);
			throw error;
		}
	};

	getByEmail = async email => {
		try {
			const result = await this.dao.getByEmail(email);
			logger.info(
				`R: 📄 Ticket con email ${email} obtenido exitosamente:`,
				result
			);
			return result;
		} catch (error) {
			logger.error(`R: ⚠️ Error al obtener ticket con email ${email}:`, error);
			throw error;
		}
	};

	get = async () => {
		try {
			const result = await this.dao.get();
			logger.info("R: 📄 Ticket obtenido exitosamente:", result);
			return result ? new TicketDTO(result) : result;
		} catch (error) {
			logger.error("R: ⚠️ Error al obtener ticket:", error);
			throw error;
		}
	};

	post = async ticket => {
		try {
			const ticketToInsert = new TicketDTO(ticket);
			logger.info("R: 📝 Creando nuevo ticket:", ticketToInsert);
			return await this.dao.post(ticketToInsert);
		} catch (error) {
			logger.error("R: ⚠️ Error al crear ticket:", error);
			throw error;
		}
	};

	put = async (id, ticket) => {
		try {
			const ticketToUpdate = new TicketDTO(ticket);
			logger.info("R: 🔄 Actualizando ticket:", ticketToUpdate);
			return await this.dao.put(id, ticketToUpdate);
		} catch (error) {
			logger.error("R: ⚠️ Error al actualizar ticket:", error);
			throw error;
		}
	};

	delete = async id => {
		try {
			const result = await this.dao.delete(id);
			logger.info(`R: 🗑️ Ticket con ID ${id} eliminado exitosamente.`);
			return result;
		} catch (error) {
			logger.error(`R: ⚠️ Error al eliminar ticket con ID ${id}:`, error);
			throw error;
		}
	};
}
