import CartsDAO from "../../carts/carts.dao.js";
import UsersDAO from "../../users/users.dao.js";
import ProductsDAO from "../products.dao.js";
import ProductRepository from "./products.repository.js";

export const productsService = new ProductRepository(
	new ProductsDAO(),
	new UsersDAO(),
	new CartsDAO()
);
