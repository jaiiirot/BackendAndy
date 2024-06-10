// import { servicesExternal } from "../../../services/repository/external.service";
import { messagesService } from "../../messages/repository/messages.service.js";
export default class CartRepository {
	constructor(dao, productDao, ticketDao) {
		this.dao = dao;
		this.productDao = productDao;
		this.ticketDao = ticketDao;
	}

	getAll = async (query, options) => {
		const carts = await this.dao.getAll(query, options);
		return carts;
	};

	getById = async id => {
		const cart = await this.dao.getById(id);
		return cart;
	};

	getProductToCart = async (cartId, productId) => {
		const product = await this.dao.getProductToCart(cartId, productId);
		return product;
	};

	getByIdPopulate = async id => {
		const cart = await this.dao.getByIdPopulate(id);
		return cart;
	};

	getPurchaseCart = async (cid, email) => {
		const cart = await this.dao.getByIdPopulate(cid);
		const amount = cart.products.reduce((total, product) => {
			if (product.quantity < product.pid.stock) {
				return total + product.pid.price * product.quantity;
			}
			return total;
		}, 0);
		const result = await this.ticketDao.post({ amount, purchaser: email });
		if (result) {
			await messagesService.postMailPurchaseCartByEmail(
				email,
				result.code,
				cart.products
			);
			cart.products.forEach(async product => {
				await this.productDao.putStockByProduct(
					"less",
					product.pid._id,
					product.quantity
				);
			});
			await this.dao.deleteCart(cid);
		}
		return result;
	};

	post = async cart => {
		const newCart = await this.dao.addCart(cart);
		return newCart;
	};

	postAddProductToCart = async (cartId, productId) => {
		await this.dao.CartAddProduct(cartId, productId);
	};

	put = async (id, data) => {
		const updatedCart = await this.dao.updateCart(id, data);
		return updatedCart;
	};

	putUpdateProductInCart = async (cartId, productId, action) => {
		await this.dao.CartUpdateProduct(cartId, productId, action);
	};

	delete = async id => {
		const deletedCart = await this.dao.deleteCart(id);
		return deletedCart;
	};

	deleteProductInCart = async (cartId, productId) => {
		await this.dao.CartDeleteProduct(cartId, productId);
	};
}
