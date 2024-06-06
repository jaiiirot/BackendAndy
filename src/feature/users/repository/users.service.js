import UsersDAO from "../users.dao.js";
import CartsDAO from "../../carts/carts.dao.js";
import MessagesDAO from "../../messages/messages.dao.js";

import UsersRepository from "./users.repository.js";

export const usersService = new UsersRepository(
	new UsersDAO(),
	new CartsDAO(),
	new MessagesDAO()
);
