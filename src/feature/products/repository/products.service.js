import ProductsDAO from "../products.dao.js";
import ProductRepository from "./products.repository.js";

export const productsService = new ProductRepository(new ProductsDAO());
