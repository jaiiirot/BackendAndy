import { Carts } from "./carts.schema.js";
export default class CartsDAO {
	async getAll() {
		try {
			return await Carts.find({}).lean();
		} catch (error) {
			console.error("Error al obtener todos los carritos:", error);
		}
	}

	async getById(id) {
		try {
			return await Carts.findById(id).lean();
		} catch (error) {
			console.error("Error al obtener carrito por id:", error);
		}
	}

	async getProductToCart(cartId, productId) {
		try {
			const cart = await this.getById(cartId);
			if (!cart) console.error("Carrito no encontrado");
			const product = cart.products.find(prod => prod.pid.equals(productId));
			if (!product) console.error("Producto no encontrado en el carrito");
			return product;
		} catch (error) {
			console.error("Error al obtener producto del carrito:", error);
		}
	}

	async getByIdPopulate(id) {
		try {
			return await Carts.findById(id).populate("products.pid").lean();
		} catch (error) {
			console.error("Error al obtener carrito por id:", error);
		}
	}

	async addCart(cart) {
		try {
			return await Carts.create(cart);
		} catch (error) {
			console.error("Error al agregar carrito:", error);
		}
	}

	async CartAddProduct(cartId, productId) {
		try {
			const existcart = await this.getById(cartId);
			if (!existcart) {
				console.error("Carrito no encontrado");
			}
			// console.log(cartId, productId, existcart);
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
			console.error("Error al agregar producto al carrito:", error);
		}
	}

	async updateCart(cartId, cart) {
		try {
			return await Carts.findByIdAndUpdate(cartId, cart, { new: true });
		} catch (error) {
			console.error("Error al actualizar carrito:", error);
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
					console.error("Error: Acción inválida");
					return;
			}
			await Carts.updateOne({ _id: cartId, "products.pid": productId }, update);
		} catch (error) {
			console.error(
				"Error al actualizar la cantidad del producto en el carrito:",
				error
			);
		}
	}

	async delete(cartId) {
		try {
			return await Carts.findByIdAndDelete(cartId);
		} catch (error) {
			console.error("Error al eliminar carrito:", error);
		}
	}

	async deleteCart(cartId) {
		try {
			return await Carts.updateOne({ _id: cartId }, { $set: { products: [] } });
		} catch (error) {
			console.error("Error al eliminar carrito:", error);
		}
	}

	async CartDeleteProduct(cartId, productId) {
		try {
			await Carts.updateOne(
				{ _id: cartId },
				{ $pull: { products: { pid: productId } } }
			);
		} catch (error) {
			console.error("Error al eliminar producto del carrito:", error);
		}
	}
}
