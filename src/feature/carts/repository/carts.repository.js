export default class CartRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => {
		const result = await this.dao.getAll();
		return result;
	};

	getById = async id => {
		const result = await this.dao.getById(id);
		return result;
	};

	add = async products => {
		const result = await this.dao.add(products);
		return result;
	};

	addNewProductInCartById = async (cartId, productID, quantity) => {
		const result = await this.dao.addNewProductInCartById(
			cartId,
			productID,
			quantity
		);
		return result;
	};

	updateOneProductInCart = async (cartId, productID, quantity) => {
		const result = await this.dao.updateOneProductInCart(
			cartId,
			productID,
			quantity
		);
		return result;
	};

	updateAllProductsInCart = async (cartId, products) => {
		const result = await this.dao.updateAllProductsInCart(cartId, products);
		return result;
	};

	removeProductInCartById = async (cartId, productID) => {
		const result = await this.dao.removeProductInCartById(cartId, productID);
		return result;
	};

	update = async (id, data) => {
		const result = await this.dao.update(id, data);
		return result;
	};

	remove = async id => {
		const result = await this.dao.remove(id);
		return result;
	};

	getAllWithLimit = async (limit, skip = 0) => {
		const result = await this.dao.getAllWithLimit(limit, (skip = 0));
		return result;
	};

	createCartEmpty = async () => {
		const result = await this.dao.createCartEmpty();
		return result;
	};
}
