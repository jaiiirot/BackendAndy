import MessagesDAO from "../messages.dao.js";
import MessagesRepository from "./messages.repository.js";

export const messagesService = new MessagesRepository(new MessagesDAO());
