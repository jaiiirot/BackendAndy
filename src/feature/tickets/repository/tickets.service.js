import TicketsDAO from "../tickets.dao.js";
import TicketRepository from "./tickets.repository.js";

export const ticketsService = new TicketRepository(new TicketsDAO());
