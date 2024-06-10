import { logger } from "../../../utils/logger/logger.js";
import TicketDTO from "../tickets.dto.js";

export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => {
		try {
			const result = await this.dao.getAll();
			logger.info("🟢 Se obtubo todos los tickets");
			return result ? result.map(ticket => new TicketDTO(ticket)) : result;
		} catch (error) {
			logger.error("🔴 Error al obtener todos los tickets:", error);
			throw error;
		}
	};

	get = async () => {
		try {
			const result = await this.dao.get();
			logger.info("🟢 Obteniendo ticket:", result);
			return result ? new TicketDTO(result) : result;
		} catch (error) {
			logger.error("🔴 Error al obtener ticket:", error);
			throw error;
		}
	};

	post = async ticket => {
		try {
			const ticketToInsert = new TicketDTO(ticket);
			logger.info("🟢 Creando ticket:", ticketToInsert);
			return await this.dao.post(ticketToInsert);
		} catch (error) {
			logger.error("🔴 Error al crear ticket:", error);
			throw error;
		}
	};

	put = async (id, ticket) => {
		try {
			const ticketToUpdate = new TicketDTO(ticket);
			logger.info("🟢 Actualizando ticket:", ticketToUpdate);
			return await this.dao.put(id, ticketToUpdate);
		} catch (error) {
			logger.error("🔴 Error al actualizar ticket:", error);
			throw error;
		}
	};

	delete = async id => {
		try {
			return await this.dao.delete(id);
		} catch (error) {
			logger.error("🔴 Error al eliminar ticket:", error);
			throw error;
		}
	};
}
