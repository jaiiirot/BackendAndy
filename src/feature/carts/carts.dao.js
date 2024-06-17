import { Carts } from "./carts.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class CartsDAO {
	async getAll() {
		try {
			return await Carts.find({}).lean();
		} catch (error) {
			logger.error("D: 🔴 Error al obtener todos los carritos:", error);
			throw error;
		}
	}

	async getById(id) {
		try {
			return await Carts.findById(id).lean();
		} catch (error) {
			logger.error("D: 🔴 Error al obtener carrito por id:", error);
			throw error;
		}
	}

	async getProductToCart(cartId, productId) {
		try {
			const cart = await this.getById(cartId);
			if (!cart) logger.error("D: 🔴 Carrito no encontrado");
			const product = cart.products.find(prod => prod.pid.equals(productId));
			if (!product) logger.error("D: 🔴 Producto no encontrado en el carrito");
			return product;
		} catch (error) {
			logger.error("D: 🔴 Error al obtener producto del carrito:", error);
			throw error;
		}
	}

	async getByIdPopulate(id) {
		try {
			return await Carts.findById(id).populate("products.pid").lean();
		} catch (error) {
			logger.error("D: 🔴 Error al obtener carrito por id:", error);
			throw error;
		}
	}

	async addCart(cart) {
		try {
			return await Carts.create(cart);
		} catch (error) {
			logger.error("D: 🔴 Error al agregar carrito:", error);
			throw error;
		}
	}

	async CartAddProduct(cartId, productId) {
		try {
			const existcart = await this.getById(cartId);
			if (!existcart) {
				logger.error("D: 🔴 Carrito no encontrado");
			}
			const existprod = existcart.products.find(prod =>
				prod.pid.equals(productId)
			);

			if (existprod) {
				await Carts.updateOne(
					{ _id: cartId, "products.pid": productId },
					{ $inc: { "products.$[elem].quantity": 1 } },
					{ arrayFilters: [{ "elem.pid": productId }] }
				);
			} else {
				await Carts.updateOne(
					{ _id: cartId },
					{ $push: { products: { pid: productId, quantity: 1 } } }
				);
			}
		} catch (error) {
			logger.error("D: 🔴 Error al agregar producto al carrito:", error);
			throw error;
		}
	}

	async updateCart(cartId, cart) {
		try {
			return await Carts.findByIdAndUpdate(cartId, cart, { new: true });
		} catch (error) {
			logger.error("D: 🔴 Error al actualizar carrito:", error);
			throw error;
		}
	}

	async CartUpdateProduct(cartId, productId, action) {
		try {
			let update = {};

			switch (action) {
				case "add":
					update = { $inc: { "products.$.quantity": 1 } };
					break;
				case "less":
					update = { $inc: { "products.$.quantity": -1 } };
					break;
				default:
					logger.error("D: 🔴 Error: Acción inválida");
					return;
			}
			await Carts.updateOne({ _id: cartId, "products.pid": productId }, update);
		} catch (error) {
			logger.error(
				"D: 🔴 Error al actualizar la cantidad del producto en el carrito:",
				error
			);
			throw error;
		}
	}

	async delete(cartId) {
		try {
			return await Carts.deleteOne(cartId);
		} catch (error) {
			logger.error("D: 🔴 Error al eliminar carrito:", error);
			throw error;
		}
	}

	async deleteCart(cartId) {
		try {
			return await Carts.updateOne({ _id: cartId }, { $set: { products: [] } });
		} catch (error) {
			logger.error("D: 🔴 Error al eliminar carrito:", error);
			throw error;
		}
	}

	async CartDeleteProduct(cartId, productId) {
		try {
			await Carts.updateOne(
				{ _id: cartId },
				{ $pull: { products: { pid: productId } } }
			);
		} catch (error) {
			logger.error("D: 🔴 Error al eliminar producto del carrito:", error);
			throw error;
		}
	}
}
