import CartsDAO from "../carts.dao.js";
import CartRepository from "./carts.repository.js";

export const cartsService = new CartRepository(new CartsDAO());
