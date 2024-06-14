import { messagesService } from "../../messages/repository/messages.service.js";
import { logger } from "../../../utils/logger/logger.js";

export default class CartRepository {
	constructor(dao, productDao, ticketDao) {
		this.dao = dao;
		this.productDao = productDao;
		this.ticketDao = ticketDao;
	}

	getAll = async (query, options) => {
		try {
			const carts = await this.dao.getAll(query, options);
			logger.info("R: 🛒 Todos los carros obtenidos correctamente");
			return carts;
		} catch (error) {
			logger.error("R: ❌ Error al obtener todos los carros", error);
			throw error;
		}
	};

	getById = async id => {
		try {
			const cart = await this.dao.getById(id);
			logger.info(`R: 🛒 Carro con ID ${id} obtenido correctamente`);
			return cart;
		} catch (error) {
			logger.error(`R: ❌ Error al obtener el carro con ID ${id}`, error);
			throw error;
		}
	};

	getProductToCart = async (cartId, productId) => {
		try {
			const product = await this.dao.getProductToCart(cartId, productId);
			logger.info(`R: 🛒 Producto con ID ${productId} en el carro con ID ${cartId} obtenido correctamente`);
			return product;
		} catch (error) {
			logger.error(`R: ❌ Error al obtener el producto con ID ${productId} en el carro con ID ${cartId}`, error);
			throw error;
		}
	};

	getByIdPopulate = async id => {
		try {
			const cart = await this.dao.getByIdPopulate(id);
			logger.info(`R: 🛒 Carro con ID ${id} obtenido y poblado correctamente`);
			return cart;
		} catch (error) {
			logger.error(`R: ❌ Error al obtener y poblar el carro con ID ${id}`, error);
			throw error;
		}
	};

	getPurchaseCart = async (hostANDport, cid, email) => {
		try {
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
					hostANDport,
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
			logger.info(`R: 🛒 Compra realizada correctamente para el carro con ID ${cid}`);
			return result;
		} catch (error) {
			logger.error(`R: ❌ Error al realizar la compra para el carro con ID ${cid}`, error);
			throw error;
		}
	};

	post = async cart => {
		try {
			const newCart = await this.dao.addCart(cart);
			logger.info("R: 🛒 Nuevo carro agregado correctamente");
			return newCart;
		} catch (error) {
			logger.error("R: ❌ Error al agregar un nuevo carro", error);
			throw error;
		}
	};

	postAddProductToCart = async (cartId, productId) => {
		try {
			await this.dao.CartAddProduct(cartId, productId);
			logger.info(`R: 🛒 Producto con ID ${productId} añadido al carro con ID ${cartId} correctamente`);
		} catch (error) {
			logger.error(`R: ❌ Error al añadir el producto con ID ${productId} al carro con ID ${cartId}`, error);
			throw error;
		}
	};

	put = async (id, data) => {
		try {
			const updatedCart = await this.dao.updateCart(id, data);
			logger.info(`R: 🛒 Carro con ID ${id} actualizado correctamente`);
			return updatedCart;
		} catch (error) {
			logger.error(`R: ❌ Error al actualizar el carro con ID ${id}`, error);
			throw error;
		}
	};

	putUpdateProductInCart = async (cartId, productId, action) => {
		try {
			await this.dao.CartUpdateProduct(cartId, productId, action);
			logger.info(`R: 🛒 Producto con ID ${productId} en el carro con ID ${cartId} actualizado correctamente`);
		} catch (error) {
			logger.error(`R: ❌ Error al actualizar el producto con ID ${productId} en el carro con ID ${cartId}`, error);
			throw error;
		}
	};

	delete = async id => {
		try {
			const deletedCart = await this.dao.deleteCart(id);
			logger.info(`R: 🛒 Carro con ID ${id} eliminado correctamente`);
			return deletedCart;
		} catch (error) {
			logger.error(`R: ❌ Error al eliminar el carro con ID ${id}`, error);
			throw error;
		}
	};

	deleteProductInCart = async (cartId, productId) => {
		try {
			await this.dao.CartDeleteProduct(cartId, productId);
			logger.info(`R: 🛒 Producto con ID ${productId} eliminado del carro con ID ${cartId} correctamente`);
		} catch (error) {
			logger.error(`R: ❌ Error al eliminar el producto con ID ${productId} del carro con ID ${cartId}`, error);
			throw error;
		}
	};
}
