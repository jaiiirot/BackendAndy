import { Tickets } from "./tickets.schema.js";

export default class TicketsDAO {
	getAll = async () => {
		try {
			const tickets = await Tickets.find().lean();
			return tickets;
		} catch (error) {
			console.log("❌ ~ TicketDao ~ get= ~ error:", error);
			throw error;
		}
	};

	get = async id => {
		try {
			const ticket = await Tickets.findById(id).lean();
			return ticket;
		} catch (error) {
			console.log("❌ ~ TicketDao ~ get= ~ error:", error);
			throw error;
		}
	};

	post = async ticket => {
		try {
			const newTicket = await new Tickets(ticket).save();
			return newTicket;
		} catch (error) {
			console.log("❌ ~ TicketDao ~ create= ~ error:", error);
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
			console.log("❌ ~ TicketDao ~ update= ~ error:", error);
			throw error;
		}
	};

	delete = async id => {
		try {
			const ticketDeleted = await Tickets.findByIdAndDelete(id);
			return ticketDeleted;
		} catch (error) {
			console.log("❌ ~ TicketDao ~ delete= ~ error:", error);
			throw error;
		}
	};
}
