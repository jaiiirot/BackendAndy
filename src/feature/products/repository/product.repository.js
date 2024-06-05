import ProductDTO from "../product.dto.js";

export default class ProductRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async (limit, page, sort, category, available) => {
		const result = await this.dao.getAll(
			limit,
			page,
			sort,
			category,
			available
		);
		return result;
	};

	getAllWithStock = async () => {
		const result = await this.dao.getAllWithStock();
		return result;
	};

	getWithCode = async code => {
		const result = await this.dao.getWithCode(code);
		return result;
	};

	getAllWithLimit = async (limit, skip) => {
		const result = await this.dao.getAllWithLimit(limit, skip);
		return result;
	};

	getById = async id => {
		const result = await this.dao.getById(id);
		return result;
	};

	// get all products in one array the ids
	getByIdInMatriz = async productIds => {
		const result = await this.dao.getByIdInMatriz(productIds);
		return result;
	};

	add = async product => {
		const productToInsert = new ProductDTO(product);
		const result = await this.dao.add(productToInsert);
		return result;
	};

	update = async (id, products) => {
		const productToUpdate = new ProductDTO(products);
		const result = await this.dao.update(id, productToUpdate);
		return result;
	};

	remove = async product => {
		const productToRemove = new ProductDTO(product);
		const result = await this.dao.remove(productToRemove);
		return result;
	};
}
