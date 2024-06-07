import ProductsDAO from "../../products/products.dao.js";
import TicketsDAO from "../../tickets/tickets.dao.js";
import CartsDAO from "../carts.dao.js";
import CartRepository from "./carts.repository.js";

export const cartsService = new CartRepository(
	new CartsDAO(),
	new ProductsDAO(),
	new TicketsDAO()
);
