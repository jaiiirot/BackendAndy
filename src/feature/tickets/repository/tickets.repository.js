import TicketDTO from "../tickets.dto.js";
export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => {
		const result = await this.dao.getAll();
		console.log(
			"🚀 ~ file: tickets.repository.js ~ line 6 ~ TicketRepository ~ getAll= ~ result",
			result
		);
		return result ? result.map(ticket => new TicketDTO(ticket)) : result;
	};

	get = async () => {
		const result = await this.dao.get();
		console.log(
			"🚀 ~ file: tickets.repository.js ~ line 6 ~ TicketRepository ~ get= ~ result",
			result
		);
		return result ? new TicketDTO(result) : result;
	};

	post = async ticket => {
		const ticketToInsert = new TicketDTO(ticket);
		console.log(
			"🚀 ~ file: tickets.repository.js ~ line 14 ~ TicketRepository ~ create= ~ ticketToInsert",
			ticketToInsert
		);
		return await this.dao.post(ticketToInsert);
	};

	put = async (id, ticket) => {
		const ticketToUpdate = new TicketDTO(ticket);
		console.log(
			"🚀 ~ file: tickets.repository.js ~ line 23 ~ TicketRepository ~ update= ~ ticketToUpdate",
			ticketToUpdate
		);
		return await this.dao.put(id, ticketToUpdate);
	};

	delete = async id => {
		return await this.dao.delete(id);
	};
}
